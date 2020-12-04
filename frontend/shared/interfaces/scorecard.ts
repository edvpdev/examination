import { IsInt, IsString, IsArray } from 'class-validator';
import { Exam } from './exam';

export class Scorecard {
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
