import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScorecardsListComponent, ScorecardViewComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: ScorecardsListComponent,
  },
  {
    path: ':id',
    component: ScorecardViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScorecardsRoutingModule {}
