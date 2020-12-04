import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { User } from '../../../../../shared/interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private user: User = null;
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {}

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  isUser(): boolean {
    return this.auth.isUser();
  }

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  isTeacher(): boolean {
    return this.auth.isTeacher();
  }

  displayName(): boolean {
    return this.auth.displayName();
  }

  logout() {
    console.log('Logout');
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
