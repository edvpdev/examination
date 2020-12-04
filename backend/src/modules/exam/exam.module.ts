import { Module, forwardRef } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamSchema } from '../../schemas/exam.schema';
import { QuestionsModule } from '../questions/questions.module';
import { ScorecardModule } from '../scorecard/scorecard.module';

@Module({
  imports: [
    forwardRef(() => QuestionsModule),
    forwardRef(() => ScorecardModule),
    MongooseModule.forFeature([{ name: 'Exams', schema: ExamSchema }]),
  ],
  controllers: [ExamController],
  providers: [ExamService],
  exports: [ExamService],
})
export class ExamModule {}
