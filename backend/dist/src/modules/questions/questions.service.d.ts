import { Model } from 'mongoose';
import { IQuestion, IQuestionDoc } from '../../interfaces/question';
import { ExamService } from '../exam/exam.service';
import { CategoryService } from '../category/category.service';
import { Exam } from '../../interfaces/exam';
export declare class QuestionsService {
    private readonly examService;
    private readonly categoryService;
    private questionModel;
    constructor(examService: ExamService, categoryService: CategoryService, questionModel: Model<IQuestionDoc>);
    getAllQuestions(pageNumber: number, pageSize: number): Promise<IQuestion[]>;
    getCount(): Promise<any>;
    getQuestion(id: string): Promise<IQuestion>;
    getQuestionsByExamID(examID: string): Promise<IQuestion[]>;
    getQuestionsByCategoryID(categoryID: string): Promise<IQuestion[]>;
    createQuestion(question: IQuestion): Promise<IQuestion>;
    updateQuestion(id: string, question: Partial<IQuestion>): Promise<IQuestion>;
    deleteQuestion(questionID: string): Promise<IQuestion>;
    findIterator(filters: any, projection?: any, options?: any): any;
    findOne(filters: any): Promise<IQuestion>;
    removeExamFromQuestion(questionID: string, examID: string): Promise<any>;
    removeExamFromQuestions(questions: any, examID: string): Promise<void>;
    addExamForQuestion(questionID: string, exam: Exam): Promise<any>;
    addExamToQuestions(questions: any, exam: Exam): Promise<void>;
    validateReceivedQuestions(questions: Partial<IQuestion[]>): Promise<IQuestion[]>;
    compareOldToNewQuestions(oldQuestions: Partial<IQuestion[]>, newQuestions: Partial<IQuestion[]>): Array<any>;
}
