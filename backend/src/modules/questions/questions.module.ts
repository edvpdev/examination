import { ExamModule } from './../exam/exam.module';
import { CategoryModule } from './../category/category.module';
import { Module, forwardRef } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionSchema } from '../../schemas/question.schema';

@Module({
  imports: [
    forwardRef(() => ExamModule),
    forwardRef(() => CategoryModule),
    MongooseModule.forFeature([{ name: 'Questions', schema: QuestionSchema }]),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
