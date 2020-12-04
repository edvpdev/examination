import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQuestion } from '../../../../shared/interfaces/question';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  getAllQuestions(pageNumber = 1, pageSize = 0): Observable<any> {
    return this.http.get<IQuestion[]>('/api/questions', {
      params: new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString()),
    });
  }

  getQuestionsByExamID(examID: string): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(`/api/questions/exam/${examID}`);
  }

  getQuestionsByCategoryID(categoryID: string): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(
      `/api/questions/categories/${categoryID}`,
    );
  }

  getQuestion(questionID: string): Observable<IQuestion> {
    return this.http.get<IQuestion>(`/api/questions/${questionID}`);
  }

  createQuestion(changes: Partial<IQuestion>) {
    return this.http.post('/api/questions', changes);
  }

  updateQuestion(questionID: string, changes: Partial<IQuestion>) {
    return this.http.put(`/api/questions/${questionID}`, changes);
  }

  deleteQuestion(questionID: string) {
    return this.http.delete(`/api/questions/${questionID}`);
  }
}
