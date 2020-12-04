import { Module, forwardRef } from '@nestjs/common';
import { ScorecardController } from './scorecard.controller';
import { ScorecardService } from './scorecard.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScorecardSchema } from '../../schemas/scorecard.schema';
import { ExamModule } from '../exam/exam.module';

@Module({
  imports: [
    forwardRef(() => ExamModule),
    MongooseModule.forFeature([
      { name: 'Scorecards', schema: ScorecardSchema },
    ]),
  ],
  controllers: [ScorecardController],
  providers: [ScorecardService],
  exports: [ScorecardService],
})
export class ScorecardModule {}
