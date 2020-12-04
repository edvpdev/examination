import {
  Controller,
  Put,
  Post,
  Delete,
  Get,
  Body,
  Query,
  Param,
} from '@nestjs/common';
import { ScorecardService } from './scorecard.service';
import { Scorecard } from '../../interfaces/scorecard';

@Controller('scorecards')
export class ScorecardController {
  constructor(private readonly scorecardService: ScorecardService) {}

  // Pagination, default all
  // @Teacher, @Admin
  // GET getAllScorecards
  // RETURN [all fields]
  // IN teacher page
  @Get()
  async getAllScorecards(
    @Query('pageNumber') pageNumber = 1,
    @Query('pageSize') pageSize = 0,
    @Query('exclude') exclude = '',
  ): Promise<any> {
    const count: number = await this.scorecardService.getCount(exclude);
    pageNumber =
      typeof pageNumber === 'string' ? parseInt(pageNumber) : pageNumber;
    pageSize = typeof pageSize === 'string' ? parseInt(pageSize) : pageSize;
    const res: Scorecard[] = await this.scorecardService.getAllScorecards(
      pageNumber,
      pageSize,
      exclude,
    );
    return { res: res, total: count };
  }

  // @Teacher, @Admin
  // GET getScorecard(id)
  // RETURN all fields
  // IN teacher page, scorecard overview section
  @Get(':id')
  async getScorecard(@Param('id') id: string): Promise<Scorecard> {
    return this.scorecardService.getScorecard(id);
  }

  // @All
  // RETURN scorecardID, answers = []
  // PARAMS answers = [], status = 'in progress', examName, startTime?, user
  // IN when starting exam
  @Post()
  createScorecard(
    @Query('examID') examID: string,
    @Query('user') user: string,
    @Body() answers: Array<any>,
  ): Promise<Scorecard> {
    return this.scorecardService.createScorecard(examID, user, answers);
  }

  // @ALL
  // PUT -> /scorecards/submit
  // PARAMS answers(copy of questions arr + answers), id, status = 'ready for review'
  // IN after submitting exam
  // RETURN id or succes
  @Put(':id')
  updateScorecard(
    @Param('id') scorecardID: string,
    @Body() scorecard: Partial<Scorecard>,
    @Query('type') type: string,
  ): Promise<Scorecard> {
    return this.scorecardService.updateScorecard(scorecardID, scorecard, type);
  }

  // @All
  // PARAMS id
  // IN when canceling exam taking
  @Delete(':id')
  deleteScorecard(@Param('id') scorecardID: string): Promise<Scorecard> {
    return this.scorecardService.deleteScorecard(scorecardID);
  }
}
