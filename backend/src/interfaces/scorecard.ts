import { IsInt, IsString, IsArray } from 'class-validator';
import { Document } from 'mongoose';
import { Exam } from './exam';

export class Scorecard extends Document {
  // @IsArray
  // @ValidateNested
  @IsString() exam: Exam;
  @IsString() status: string;
  @IsInt() bonusScore: number;
  @IsInt() totalScore: number;
  @IsString() notes: string;
  @IsString() user: string;
  @IsArray() answers: Array<any>;
  @IsString() title: string;
}
