import {
  Injectable,
  Inject,
  BadRequestException,
  forwardRef,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Scorecard } from '../../interfaces/scorecard';
import { ExamService } from '../exam/exam.service';

@Injectable()
export class ScorecardService {
  constructor(
    @InjectModel('Scorecards')
    private scorecardModel: Model<Scorecard>,
    @Inject(forwardRef(() => ExamService))
    private readonly examService: ExamService,
  ) {}

  async getAllScorecards(
    pageNumber: number,
    pageSize: number,
    exclude: string,
  ): Promise<Scorecard[]> {
    console.log(exclude);
    return this.scorecardModel
      .find({
        status: { $ne: exclude },
      })
      .sort({ title: 'asc' })
      .skip(pageSize * (pageNumber === 0 ? 1 - 1 : pageNumber - 1))
      .limit(pageSize)
      .select(['_id', 'title', 'createdAt', 'user', 'status']);
  }

  async getCount(exclude: string) {
    return this.scorecardModel
      .find({
        status: { $ne: exclude },
      })
      .countDocuments();
  }

  async getScorecard(id: string): Promise<Scorecard> {
    return this.scorecardModel
      .findOne({ _id: id })
      .populate({
        path: 'exams',
        select: 'title _id',
      })
      .select('-__v -updatedAt');
  }

  async createScorecard(
    examID: string,
    user: string,
    answers: Array<any>,
  ): Promise<Scorecard> {
    // NEEDS examService
    const exam = await this.examService.getExam(examID);
    if (exam === null) {
      throw new BadRequestException(
        'Scorecard for non-existant exam cannot be created',
      );
    }

    const newScorecard = {
      user: user, // update later on once auth service is created
      status: 'Ready for review',
      answers: answers,
      exam: exam,
      bonusScore: 0,
      totalScore: 0,
      notes: '',
      title: `${exam?.title} - ${user}`,
    };

    const createdScorecard = this.scorecardModel(newScorecard);
    await createdScorecard.save();
    return createdScorecard.toObject({ versionKey: false });
  }

  async updateScorecard(
    scorecardID: string,
    scorecard: Partial<Scorecard>,
    type: string,
  ): Promise<Scorecard> {
    const { title, user, answers, notes, bonusScore } = scorecard;
    console.log(scorecard);

    // validate answers, more advanced solution is possible, needs new schema relationship implementation
    if (!this.validateAnswers(answers)) {
      throw new BadRequestException('Answers array is not valid.');
    }

    // !!!! additional checks per user may be added
    const oldScorecard = await this.scorecardModel
      .findOne({ _id: scorecardID })
      .populate('exam')
      .exec();

    // console.log(oldScorecard.questions.exam);
    // check if same amount of answers is provided as there questions
    if (oldScorecard.exam.questions.length !== answers.length) {
      throw new BadRequestException(
        'Fewer answers are provided as there are questions for this scorecard',
      );
    }

    if (oldScorecard) {
      oldScorecard.title = title || oldScorecard.title;
      oldScorecard.answers = [...answers]; // no validation fors asnwers!!
      oldScorecard.status = type === 'save' ? oldScorecard.status : 'Reviewed';
      oldScorecard.notes = notes || oldScorecard.notes;
      oldScorecard.bonusScore = bonusScore || oldScorecard.bonusScore;
      oldScorecard.exam = oldScorecard.exam;
      oldScorecard.user = user || oldScorecard.user;
      oldScorecard.totalScore =
        this.calculateTotalScore(answers, bonusScore) || 0;

      const updatedScorecard = await oldScorecard.save();
      return updatedScorecard;
    } else {
      throw new BadRequestException('Failed updating scorecard');
    }
  }

  // @All
  // on exit exam && admin menu
  async deleteScorecard(scorecardID: string): Promise<Scorecard> {
    return this.scorecardModel.findOneAndDelete({ _id: scorecardID });
  }

  /*** HELPERS ***/
  findIterator(filters: any, projection?: any, options?: any) {
    return this.scorecardModel.find(filters, projection, options);
  }

  async findOneAndDelete(filters: any): Promise<Scorecard> {
    return await this.scorecardModel.findOneAndDelete(filters);
  }

  calculateTotalScore(answers: Array<any>, bonusScore: number): number {
    const score = answers.reduce((a, b) => {
      return a + b.givenScore;
    }, 0);
    return score + bonusScore;
  }

  validateAnswers(answers: Array<any>): boolean {
    const isValid = answers.every((answer) => {
      const {
        title,
        questionText,
        questionAnswer,
        maxScore,
        givenScore,
        category,
      } = answer;
      if (
        typeof title !== 'string' ||
        typeof questionText !== 'string' ||
        typeof questionAnswer !== 'string' ||
        typeof category !== 'string'
      ) {
        return false;
      }
      if (isNaN(maxScore) || isNaN(givenScore)) {
        return false;
      }
      return true;
    });
    return isValid;
  }
}
