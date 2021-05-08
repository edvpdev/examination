import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromComponents from './components';
import { ScorecardsRoutingModule } from './scorecards-routing.module';
import { SharedModule } from '@shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromScorecard from './reducers';

@NgModule({
  declarations: [fromComponents.components],
  imports: [CommonModule, SharedModule, ScorecardsRoutingModule, StoreModule.forFeature(fromScorecard.scorecardFeatureKey, fromScorecard.reducers, { metaReducers: fromScorecard.metaReducers })],
})
export class ScorecardsModule {}
