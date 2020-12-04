import { IQuestion } from './question';
import { Document } from 'mongoose';
export declare class Exam {
    questions: IQuestion[];
    title: string;
}
export declare type ExamDoc = Exam & Document;
