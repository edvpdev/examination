import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPanelComponent } from './components';
import { ExamEditViewComponent } from './components';
import { QuestionEditViewComponent } from './components';
import { CategoryEditViewComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
  },
  {
    path: 'exam/:id',
    component: ExamEditViewComponent,
  },
  {
    path: 'question/:id',
    component: QuestionEditViewComponent,
  },
  {
    path: 'category/:id',
    component: CategoryEditViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
