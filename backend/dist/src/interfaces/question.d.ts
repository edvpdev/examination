import { Exam } from './exam';
import { Category } from './category';
import { Document } from 'mongoose';
export declare class IQuestion {
    exams: Exam[];
    title: string;
    questionText: string;
    maxScore: number;
    category: Category;
}
export declare type IQuestionDoc = IQuestion & Document;
