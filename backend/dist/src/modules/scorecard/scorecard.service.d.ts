import { Model } from 'mongoose';
import { Scorecard } from '../../interfaces/scorecard';
import { ExamService } from '../exam/exam.service';
export declare class ScorecardService {
    private scorecardModel;
    private readonly examService;
    constructor(scorecardModel: Model<Scorecard>, examService: ExamService);
    getAllScorecards(pageNumber: number, pageSize: number, exclude: string): Promise<Scorecard[]>;
    getCount(exclude: string): Promise<any>;
    getScorecard(id: string): Promise<Scorecard>;
    createScorecard(examID: string, user: string, answers: Array<any>): Promise<Scorecard>;
    updateScorecard(scorecardID: string, scorecard: Partial<Scorecard>, type: string): Promise<Scorecard>;
    deleteScorecard(scorecardID: string): Promise<Scorecard>;
    findIterator(filters: any, projection?: any, options?: any): any;
    findOneAndDelete(filters: any): Promise<Scorecard>;
    calculateTotalScore(answers: Array<any>, bonusScore: number): number;
    validateAnswers(answers: Array<any>): boolean;
}
