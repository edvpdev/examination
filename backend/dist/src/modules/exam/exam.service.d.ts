import { Model } from 'mongoose';
import { Exam, ExamDoc } from '../../interfaces/exam';
import { IQuestion } from '../../interfaces/question';
import { QuestionsService } from '../questions/questions.service';
import { ScorecardService } from './../scorecard/scorecard.service';
export declare class ExamService {
    private examModel;
    private readonly questionService;
    private readonly scorecardService;
    constructor(examModel: Model<ExamDoc>, questionService: QuestionsService, scorecardService: ScorecardService);
    getAllExams(pageNumber: number, pageSize: number): Promise<Exam[]>;
    getCount(): Promise<any>;
    getExam(examID: string): Promise<Exam>;
    createExam(exam: Exam): Promise<Exam>;
    updateExam(id: string, exam: Partial<Exam>): Promise<Exam>;
    deleteExam(examID: string): Promise<Exam>;
    findIterator(filters: any, projection?: any, options?: any): any;
    findOne(filters: any): Promise<Exam>;
    removeQuestionFromExam(examID: string, questionID: string): Promise<any>;
    removeQuestionFromExams(exams: any, questionID: string): Promise<void>;
    addQuestionToExams(exams: any, question: IQuestion): Promise<void>;
    addQuestionForExam(examID: string, question: IQuestion): Promise<any>;
    validateReceivedExams(exams: any): Promise<Exam[]>;
    compareOldToNewExams(oldExams: Partial<Exam[]>, newExams: Partial<Exam[]>): Array<any>;
}
