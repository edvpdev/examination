import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamsListComponent, ExamViewComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: ExamsListComponent,
  },
  {
    path: ':id',
    component: ExamViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamsRoutingModule {}
