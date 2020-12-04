import { ValidateNested, IsArray, IsString } from 'class-validator';
import { IQuestion } from './question';
import { Type } from 'class-transformer';
import { Document } from 'mongoose';

export class Exam {
  @IsArray()
  @ValidateNested({ each: true })
  //  @Type(() => IQuestion) //<- causes bugs
  questions: IQuestion[];
  @IsString() title: string;
}

export type ExamDoc = Exam & Document;
