import { QuestionsService } from './questions.service';
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
import { IQuestion } from '../../interfaces/question';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  // Pagination, default all
  // @Admin
  // GET getAllQuestions
  // RETURN title, exam, id && title, id
  // IN Admin page && exams edit section
  @Get()
  async getAllQuestions(
    @Query('pageNumber') pageNumber = 1,
    @Query('pageSize') pageSize = 0,
  ): Promise<any> {
    const count: number = await this.questionsService.getCount();
    pageNumber =
      typeof pageNumber === 'string' ? parseInt(pageNumber) : pageNumber;
    pageSize = typeof pageSize === 'string' ? parseInt(pageSize) : pageSize;
    const res: IQuestion[] = await this.questionsService.getAllQuestions(
      pageNumber,
      pageSize,
    );
    return { res: res, total: count };
  }

  // @Admin
  // GET getQuestion(id)
  // RETURN title, category, exams, maxScore, text
  // IN admin page, question edit section
  @Get(':id')
  async getQuestion(@Param('id') id: string): Promise<IQuestion> {
    console.log(id);
    return this.questionsService.getQuestion(id);
  }

  // Custom find, sort
  // @All
  // GET questionsByExam(examID)
  // RETURN all stuff except exams field
  // IN exam test
  // REMOVE LATER, REPLACE WITH GET EXAM, POPUALTE QUESTIONS
  @Get('exam/:examID')
  async getQuestionsByExamID(
    @Param('examID') examID: string,
  ): Promise<IQuestion[]> {
    return this.questionsService.getQuestionsByExamID(examID);
  }

  // @Admin
  // GET questionsByCategory(categoryID)
  // RETURN only titles
  // IN in Admin, category edit section
  @Get('categories/:categoryID')
  async getQuestionsByCategoryID(
    @Param('categoryID') categoryID: string,
  ): Promise<IQuestion[]> {
    return this.questionsService.getQuestionsByCategoryID(categoryID);
  }

  // @Admin
  // UPDATE title, category, maxScore, text, exams
  // RETURN updated question
  // IN admin page, question edit section
  @Post()
  createQuestion(@Body() question: IQuestion): Promise<IQuestion> {
    return this.questionsService.createQuestion(question);
  }

  // @Admin
  // UPDATE title?, category?, maxScore?, text?, exams?
  // RETURN updated question
  // IN admin page, question edit section
  @Put(':id')
  updateQuestion(
    @Param('id') questionID: string,
    @Body() question: IQuestion,
  ): Promise<IQuestion> {
    return this.questionsService.updateQuestion(questionID, question);
  }

  // @Admin
  // RETURN updated question
  // IN admin page, question edit section
  @Delete(':id')
  deleteQuestion(@Param('id') questionID: string): Promise<IQuestion> {
    return this.questionsService.deleteQuestion(questionID);
  }
}
