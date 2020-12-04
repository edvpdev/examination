import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exam } from '../../../../shared/interfaces/exam';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(private http: HttpClient) {}

  getAllExams(pageNumber = 1, pageSize = 0): Observable<any> {
    return this.http.get<Exam[]>('/api/exams', {
      params: new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString()),
    });
  }

  getExam(examID: string): Observable<Exam> {
    return this.http.get<Exam>(`/api/exams/${examID}`);
  }

  createExam(changes: Partial<Exam>) {
    return this.http.post('/api/exams', changes);
  }

  updateExam(examID: string, changes: Partial<Exam>) {
    return this.http.put(`/api/exams/${examID}`, changes);
  }

  deleteExam(examID: string) {
    return this.http.delete(`/api/exams/${examID}`);
  }
}
