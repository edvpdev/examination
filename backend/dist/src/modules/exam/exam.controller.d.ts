import { ExamService } from './exam.service';
import { Exam } from '../../interfaces/exam';
export declare class ExamController {
    private readonly examService;
    constructor(examService: ExamService);
    getAllExams(pageNumber?: number, pageSize?: number): Promise<any>;
    getExam(id: string): Promise<Exam>;
    createExam(exam: Exam): Promise<Exam>;
    updateExam(examID: string, exam: Partial<Exam>): Promise<Exam>;
    deleteExam(examID: string): Promise<Exam>;
}
