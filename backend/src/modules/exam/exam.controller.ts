import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  Body,
  Query,
  Param,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { Exam } from '../../interfaces/exam';

@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  // Pagination, default all
  // @All
  // IN exams page, admin page
  // RETURN title, questions?
  @Get()
  async getAllExams(
    @Query('pageNumber') pageNumber = 1,
    @Query('pageSize') pageSize = 0,
  ): Promise<any> {
    const count: number = await this.examService.getCount();
    pageNumber =
      typeof pageNumber === 'string' ? parseInt(pageNumber) : pageNumber;
    pageSize = typeof pageSize === 'string' ? parseInt(pageSize) : pageSize;
    const res: Exam[] = await this.examService.getAllExams(
      pageNumber,
      pageSize,
    );
    return { res: res, total: count };
  }

  // @All
  // GET getExam(id)
  // RETURN title, questions?
  // IN(optional) exams page, admin page
  @Get(':id')
  async getExam(@Param('id') id: string): Promise<Exam> {
    return this.examService.getExam(id);
  }

  // @All
  // IN
  // RETURN
  @Post()
  createExam(@Body() exam: Exam): Promise<Exam> {
    return this.examService.createExam(exam);
  }

  // Pagination, default all
  // @All
  // IN
  // RETURN
  @Put(':id')
  updateExam(
    @Param('id') examID: string,
    @Body() exam: Partial<Exam>,
  ): Promise<Exam> {
    // title -> title, questions -> questions
    return this.examService.updateExam(examID, exam);
  }

  // Pagination, default all
  // @All
  // IN
  // RETURN
  @Delete(':id')
  deleteExam(@Param('id') examID: string): Promise<Exam> {
    return this.examService.deleteExam(examID);
  }
}
