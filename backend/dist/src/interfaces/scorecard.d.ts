import { Document } from 'mongoose';
import { Exam } from './exam';
export declare class Scorecard extends Document {
    exam: Exam;
    status: string;
    bonusScore: number;
    totalScore: number;
    notes: string;
    user: string;
    answers: Array<any>;
    title: string;
}
