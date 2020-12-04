import {
  Injectable,
  forwardRef,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IQuestion, IQuestionDoc } from '../../interfaces/question';
import { ExamService } from '../exam/exam.service';
import { CategoryService } from '../category/category.service';
import { Exam } from '../../interfaces/exam';

@Injectable()
export class QuestionsService {
  constructor(
    @Inject(forwardRef(() => ExamService))
    private readonly examService: ExamService,
    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,
    @InjectModel('Questions')
    private questionModel: Model<IQuestionDoc>,
  ) {}

  async getAllQuestions(
    pageNumber: number,
    pageSize: number,
  ): Promise<IQuestion[]> {
    // const exams = await this.examService.getAllExams();
    // console.log(exams);
    return this.questionModel
      .find({})
      .sort({ title: 'asc' })
      .skip(pageSize * (pageNumber === 0 ? 1 - 1 : pageNumber - 1))
      .limit(pageSize)
      .select(['_id', 'title', 'exams', 'category'])
      .populate({
        path: 'exams',
        select: 'title _id',
      })
      .populate('category')
      .exec();
  }

  async getCount() {
    return this.questionModel.find().countDocuments();
  }

  async getQuestion(id: string): Promise<IQuestion> {
    return this.questionModel
      .findOne({ _id: id })
      .populate({
        path: 'exams',
        select: 'title _id',
      })
      .populate('category')
      .select('-__v -createdAt -updatedAt');
  }

  // REMOVE LATER, REPLACE WITH GET EXAM, POPUALTE QUESTIONS
  async getQuestionsByExamID(examID: string): Promise<IQuestion[]> {
    return this.questionModel.find({ exams: { $in: [examID] } });
  }

  async getQuestionsByCategoryID(categoryID: string): Promise<IQuestion[]> {
    return this.questionModel.find({ category: categoryID });
  }

  async createQuestion(question: IQuestion): Promise<IQuestion> {
    const count = await this.questionModel
      .find({ title: question.title })
      .countDocuments();

    if (count > 0) {
      throw new BadRequestException('Question with given title already exists');
    }

    // NEEDS category, exam services, create new category or find existing
    question.category = await this.categoryService.validateReceivedCategory(
      question.category,
    );
    question.exams = await this.examService.validateReceivedExams(
      question.exams,
    );

    const newQuestion = this.questionModel(question);
    await newQuestion.save();

    question.exams.length &&
      (await this.examService.addQuestionToExams(question.exams, newQuestion));

    return newQuestion.toObject({ versionKey: false });
  }

  async updateQuestion(
    id: string,
    question: Partial<IQuestion>,
  ): Promise<IQuestion> {
    const { title, questionText, maxScore } = question;
    // Before update, be ready to update exams as well, by removing/adding questions
    const oldQuestion = await this.questionModel
      .findById({
        _id: id,
      })
      .populate('exams');

    if (!oldQuestion) {
      throw new BadRequestException('Question with such an ID does not exist');
    }
    // check if another question with such title already exists
    const questionWithGivenTitle = await this.questionModel.findOne({
      title: title,
      _id: { $ne: id },
    });
    if (questionWithGivenTitle) {
      throw new BadRequestException('Question with such title already exists');
    }

    // Double check validity of nested parameters and return actual models
    const newCategory = await this.categoryService.validateReceivedCategory(
      question.category,
    );
    const newExams = await this.examService.validateReceivedExams(
      question.exams,
    );
    const oldExams = [...oldQuestion.exams];

    // Update old question and prepare for save
    oldQuestion.title = title || oldQuestion.title;
    oldQuestion.questionText = questionText || oldQuestion.questionText;
    oldQuestion.maxScore = maxScore || oldQuestion.maxScore;
    oldQuestion.exams = newExams;
    oldQuestion.category = newCategory || oldQuestion.category;

    // comparison of question's exams, which were added/removed
    const [removedExams, addedExams] = this.examService.compareOldToNewExams(
      oldExams,
      newExams,
    );

    if (addedExams.length === 0 && removedExams.length === 0) {
      await oldQuestion.save();
      return oldQuestion;
    } else {
      // iterate through newly added exams, update their entries
      await this.examService.addQuestionToExams(addedExams, oldQuestion);

      // iterate through removed exams, update their entries
      await this.examService.removeQuestionFromExams(
        removedExams,
        oldQuestion._id,
      );

      await oldQuestion.save();
      return oldQuestion;
    }
  }

  async deleteQuestion(questionID: string): Promise<IQuestion> {
    const question = await this.questionModel
      .findOne({ _id: questionID })
      .populate('exams')
      .exec();

    question.exams.length &&
      (await this.examService.removeQuestionFromExams(
        question.exams,
        questionID,
      ));
    return await question.remove();
  }

  /***  HELPERS ****/
  // Receives object with property title
  findIterator(filters: any, projection?: any, options?: any) {
    return this.questionModel.find(filters, projection, options);
  }

  async findOne(filters: any): Promise<IQuestion> {
    return await this.questionModel.findOne(filters);
  }

  // Could be replaced with Mongo middlewares
  async removeExamFromQuestion(questionID: string, examID: string) {
    return await this.questionModel.findOneAndUpdate(
      { _id: questionID },
      { $pull: { exams: examID } },
    );
  }

  async removeExamFromQuestions(questions: any, examID: string) {
    for await (const questionDoc of this.questionModel.find({
      title: { $in: questions.map((question) => question.title) },
    })) {
      // console.log('Remove exam: ', questionDoc._id, 'from: ', oldQuestion._id);
      await this.removeExamFromQuestion(questionDoc._id, examID);
    }
  }

  // Could be replaced with Mongo middlewares
  async addExamForQuestion(questionID: string, exam: Exam) {
    return await this.questionModel.updateOne(
      { _id: questionID },
      { $push: { exams: exam } },
    );
  }

  async addExamToQuestions(questions: any, exam: Exam) {
    for await (const questionDoc of this.questionModel.find({
      title: { $in: questions.map((question) => question.title) },
    })) {
      // console.log('Add exam: ', questionDoc.title);
      await this.addExamForQuestion(questionDoc._id, exam);
    }
  }

  // Receives array of objects with property title
  async validateReceivedQuestions(
    questions: Partial<IQuestion[]>,
  ): Promise<IQuestion[]> {
    console.log(questions);
    const foundQuestions = [];
    if (questions.length) {
      // Iterate through questions via questionservice.find({title: {$in: questions : {} })
      for await (const doc of this.questionModel.find({
        title: { $in: questions.map((question) => question?.title) },
      })) {
        foundQuestions.push(doc);
      }

      console.log(foundQuestions);
      // IF not the same number of exams was found
      // OR if some exams could not be found by provided data
      // RETURN exception
      if (
        foundQuestions.length !== questions.length ||
        foundQuestions.some((question) => question === null)
      ) {
        throw new BadRequestException(
          'Provided partial question objects in exam body are invalid. Please make sure such exams exist or create exams separately.',
        );
      }
    }
    return foundQuestions;
  }

  compareOldToNewQuestions(
    oldQuestions: Partial<IQuestion[]>,
    newQuestions: Partial<IQuestion[]>,
  ): Array<any> {
    let [removedArr, addedArr] = [[], []];
    if (newQuestions.length === 0) return [[...oldQuestions], [...addedArr]];
    removedArr = oldQuestions.filter(
      (oldQuestion) =>
        !newQuestions.some((newExam) => {
          return newExam.title === oldQuestion.title;
        }),
    );
    addedArr = newQuestions.filter(
      (newExam) =>
        !oldQuestions.some((oldQuestion) => {
          return newExam.title === oldQuestion.title;
        }),
    );
    return [[...removedArr], [...addedArr]];
  }
}
