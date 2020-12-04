import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '@core/guards/admin.guard';
import { TeacherGuard } from '@core/guards/teacher.guard';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'exams',
    loadChildren: () =>
      import('./exams/exams.module').then((m) => m.ExamsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'scorecards',
    loadChildren: () =>
      import('./scorecards/scorecards.module').then((m) => m.ScorecardsModule),
    canActivate: [TeacherGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AdminGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    redirectTo: '/exams',
    pathMatch: 'full',
  },
  // {
  //   path: '**',
  //   redirectTo: '/exams',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
