import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Scorecard } from '../../../../shared/interfaces/scorecard';

@Injectable({
  providedIn: 'root',
})
export class ScorecardService {
  constructor(private http: HttpClient) {}

  getAllScorecards(
    pageNumber = 1,
    pageSize = 0,
    exclude = '',
  ): Observable<any> {
    return this.http.get<Scorecard[]>('/api/scorecards', {
      params: new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
        .set('exclude', exclude),
    });
  }

  getScorecard(scorecardID: string): Observable<Scorecard> {
    return this.http.get<Scorecard>(`/api/scorecards/${scorecardID}`);
  }

  createScorecard(examID: string, user: string, changes: any): Observable<any> {
    console.log('POST scorecard');
    return this.http.post(
      `/api/scorecards?examID=${examID}&user=${user}`,
      changes,
    );
  }

  updateScorecard(
    scorecardID: string,
    changes: Partial<Scorecard>,
    type: string,
  ): Observable<any> {
    console.log('PUT scorecard');
    return this.http.put(
      `/api/scorecards/${scorecardID}?type=${type}`,
      changes,
    );
  }

  deleteScorecard(scorecardID: string) {
    return this.http.delete(`/api/scorecards/${scorecardID}`);
  }
}
