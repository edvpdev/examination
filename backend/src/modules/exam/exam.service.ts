import {
  forwardRef,
  Inject,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Exam, ExamDoc } from '../../interfaces/exam';
import { IQuestion } from '../../interfaces/question';
import { QuestionsService } from '../questions/questions.service';
import { ScorecardService } from './../scorecard/scorecard.service';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationException } from '../../filters/validation.exception';

@Injectable()
export class ExamService {
  constructor(
    @InjectModel('Exams')
    private examModel: Model<ExamDoc>,
    @Inject(forwardRef(() => QuestionsService))
    private readonly questionService: QuestionsService,
    @Inject(forwardRef(() => ScorecardService))
    private readonly scorecardService: ScorecardService,
  ) {}

  async getAllExams(pageNumber: number, pageSize: number): Promise<Exam[]> {
    return await this.examModel
      .find({})
      .sort({ title: 'asc' })
      .skip(pageSize * (pageNumber === 0 ? 1 - 1 : pageNumber - 1))
      .limit(pageSize)
      .select(['_id', 'title', 'questions'])
      .populate({
        path: 'exams',
        select: 'title _id',
      })
      .exec();
  }

  async getCount() {
    return this.examModel.find().countDocuments();
  }

  async getExam(examID: string): Promise<Exam> {
    console.log(examID);
    return this.examModel.findOne({ _id: examID }).populate('questions').exec();
  }

  async createExam(exam: Exam): Promise<Exam> {
    const count = await this.examModel
      .find({ title: exam.title })
      .countDocuments();

    if (count > 0) {
      throw new BadRequestException('Exam with given title already exists');
    }

    if (exam.questions.length) {
      exam.questions = await this.questionService.validateReceivedQuestions(
        exam.questions,
      );
    }

    const newExam = this.examModel(exam);
    await newExam.save();

    exam.questions.length &&
      (await this.questionService.addExamToQuestions(exam.questions, newExam));

    return newExam.toObject({ versionKey: false });
  }

  async updateExam(id: string, exam: Partial<Exam>): Promise<Exam> {
    const { title } = exam;

    const oldExam = await this.examModel
      .findById({
        _id: id,
      })
      .populate('questions');

    if (!oldExam) {
      throw new BadRequestException('Exam with such an ID does not exist');
    }
    // check if another question with such title already exists
    const examWithGivenTitle = await this.examModel.findOne({
      title: title,
      _id: { $ne: id },
    });
    if (examWithGivenTitle) {
      throw new BadRequestException('Exam with such title already exists');
    }

    const newQuestions = await this.questionService.validateReceivedQuestions(
      exam.questions,
    );
    const oldQuestions = [...exam.questions];

    const [
      removedQuestions,
      addedQuestions,
    ] = this.questionService.compareOldToNewQuestions(
      oldQuestions,
      newQuestions,
    );

    oldExam.title = title || oldExam.title;

    if (addedQuestions.length === 0 && removedQuestions.length === 0) {
      await oldExam.save();
      return oldExam;
    } else {
      // iterate through newly added exams, update their entries
      await this.questionService.addExamToQuestions(addedQuestions, oldExam);

      // iterate through removed exams, update their entries
      await this.questionService.removeExamFromQuestions(
        removedQuestions,
        oldExam._id,
      );

      await oldExam.save();
      return oldExam;
    }
  }

  async deleteExam(examID: string): Promise<Exam> {
    const exam = this.examModel.findOne({ _id: examID });
    if (exam.questions.length) {
      throw new BadRequestException(
        'Cant delete exam which has questions assigned.',
      );
    } else {
      console.log('Delete Exam ID:', examID);
      // Delete associated scorecards as well
      for await (const scorecardDoc of this.scorecardService.findIterator({
        exam: examID,
      })) {
        console.log('Deleting scorecard document as well: ', scorecardDoc._id);
        await scorecardDoc.deleteOne();
      }
      return await this.examModel.findOneAndDelete({ _id: examID });
    }
  }

  /*** HELPERS ***/
  findIterator(filters: any, projection?: any, options?: any) {
    return this.examModel.find(filters, projection, options);
  }

  async findOne(filters: any): Promise<Exam> {
    return await this.examModel.findOne(filters);
  }

  // Could be replaced with Mongo middlewares
  async removeQuestionFromExam(examID: string, questionID: string) {
    return await this.examModel.findOneAndUpdate(
      { _id: examID },
      { $pull: { questions: questionID } },
    );
  }

  async removeQuestionFromExams(exams: any, questionID: string) {
    for await (const examDoc of this.examModel.find({
      title: { $in: exams.map((exam) => exam.title) },
    })) {
      // console.log('Remove exam: ', examDoc._id, 'from: ', oldQuestion._id);
      await this.removeQuestionFromExam(examDoc._id, questionID);
    }
  }

  async addQuestionToExams(exams: any, question: IQuestion) {
    for await (const examDoc of this.examModel.find({
      title: { $in: exams.map((exam) => exam.title) },
    })) {
      // console.log('Add exam: ', examDoc.title);
      await this.addQuestionForExam(examDoc._id, question);
    }
  }

  // Could be replaced with Mongo middlewares
  async addQuestionForExam(examID: string, question: IQuestion) {
    return await this.examModel.updateOne(
      { _id: examID },
      { $push: { questions: question } },
    );
  }

  async validateReceivedExams(exams): Promise<Exam[]> {
    /*
      POSSIBLE CUSTOM VALIDATION IN FUTURE, THROWS A BU ATM
    */
    // const validationArray = exams.map(async (exam, index: number) => {
    //   console.log(exam);
    //   const object = plainToClass(Exam, exam);
    //   // const errors = await validate(object, { skipMissingProperties: true });
    //   // if (errors.length) {
    //   //   const messages = errors.map(
    //   //     (error) => `Exam[${index}] ${error.property} has wrong value ${
    //   //       error.value
    //   //     },
    //   //     ${Object.values(error.constraints).join(', ')} `,
    //   //   );

    //   //   return new ValidationException(messages);
    //   // } else {
    //   //   return exam;
    //   // }
    // });
    // await Promise.all([...validationArray]);

    const foundExams = [];
    if (exams.length) {
      // Iterate through exams via examService.find({title: {$in: exams : {} })
      for await (const doc of this.examModel.find({
        title: { $in: exams.map((exam) => exam?.title) },
      })) {
        foundExams.push(doc);
      }

      // IF not the same number of exams was found
      // OR if some exams could not be found by provided data
      // RETURN exception
      if (
        foundExams.length !== exams.length ||
        foundExams.some((exam) => exam === null)
      ) {
        throw new BadRequestException(
          'Provided partial exam objects in question body are invalid. Please make sure such exams exist or create exams separately.',
        );
      }
    }
    return foundExams;
  }

  compareOldToNewExams(
    oldExams: Partial<Exam[]>,
    newExams: Partial<Exam[]>,
  ): Array<any> {
    let [removedArr, addedArr] = [[], []];
    if (newExams.length === 0) return [[...oldExams], [...addedArr]];
    removedArr = oldExams.filter(
      (oldExam) =>
        !newExams.some((newExam) => {
          return newExam.title === oldExam.title;
        }),
    );
    addedArr = newExams.filter(
      (newExam) =>
        !oldExams.some((oldExam) => {
          return newExam.title === oldExam.title;
        }),
    );
    return [[...removedArr], [...addedArr]];
  }
}
