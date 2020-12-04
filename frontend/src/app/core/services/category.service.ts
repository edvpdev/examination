import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category } from '../../../../shared/interfaces/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAllCategories(pageNumber = 1, pageSize = 0): Observable<any> {
    return this.http.get<Category[]>('/api/categories', {
      params: new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString()),
    });
  }

  getCategory(categoryID: string): Observable<Category> {
    return this.http.get<Category>(`/api/categories/${categoryID}`);
  }

  createCategory(changes: Partial<Category>) {
    return this.http.post('/api/categories', changes);
  }

  updateCategory(categoryID: string, changes: Partial<Category>) {
    return this.http.put(`/api/categories/${categoryID}`, changes);
  }

  deleteCategory(categoryID: string) {
    return this.http.delete(`/api/categories/${categoryID}`);
  }
}
