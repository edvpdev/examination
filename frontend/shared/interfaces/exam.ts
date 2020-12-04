import { ValidateNested, IsArray, IsString } from 'class-validator';
import { IQuestion } from './question';
import { Type } from 'class-transformer';

export class Exam extends Document {
  @IsArray()
  @ValidateNested({ each: true })
  //  @Type(() => IQuestion) //<- causes bugs
  questions: IQuestion[];
  @IsString() title: string;
}
