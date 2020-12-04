import { QuestionsService } from './questions.service';
import { IQuestion } from '../../interfaces/question';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    getAllQuestions(pageNumber?: number, pageSize?: number): Promise<any>;
    getQuestion(id: string): Promise<IQuestion>;
    getQuestionsByExamID(examID: string): Promise<IQuestion[]>;
    getQuestionsByCategoryID(categoryID: string): Promise<IQuestion[]>;
    createQuestion(question: IQuestion): Promise<IQuestion>;
    updateQuestion(questionID: string, question: IQuestion): Promise<IQuestion>;
    deleteQuestion(questionID: string): Promise<IQuestion>;
}
