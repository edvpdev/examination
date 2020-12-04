import { ValidateNested, IsArray, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Exam } from './exam';
import { Category } from './category';

export class IQuestion {
  @IsArray()
  @ValidateNested({ each: true })
  // @Type(() => Exam) // <- causes bugs, "Cannot read property 'plugin' of undefined" with Global pipes applied,
  exams: Exam[];
  @IsString() title: string;
  @IsString() questionText: string;
  @IsInt() maxScore: number;
  @Type(() => Category)
  category: Category;
}

export type IQuestionDoc = IQuestion & Document;
