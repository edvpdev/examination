import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const response = this.http.post('/api/auth/login', { email, password });
    console.log(response);
    return response;
  }

  isAuthenticated(): boolean {
    return localStorage['authJwtToken'] ? true : false;
  }

  isUser(): boolean {
    const roles = localStorage.user ? JSON.parse(localStorage.user).roles : '';
    return roles && roles.includes('STUDENT');
  }

  isAdmin(): boolean {
    const roles = localStorage.user ? JSON.parse(localStorage.user).roles : '';
    return roles && roles.includes('ADMIN');
  }

  isTeacher(): boolean {
    const roles = localStorage.user ? JSON.parse(localStorage.user).roles : '';
    return roles && roles.includes('TEACHER');
  }

  displayName() {
    return localStorage.user ? JSON.parse(localStorage.user).fullName : '';
  }

  logout(): void {
    console.log('Auth service: logout');
    localStorage.removeItem('authJwtToken');
    localStorage.removeItem('user');
  }
}
