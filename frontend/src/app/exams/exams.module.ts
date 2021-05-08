import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamsRoutingModule } from './exams-routing.module';
import { SharedModule } from '@shared/shared.module';

import * as fromComponents from './components';
import { StoreModule } from '@ngrx/store';
import * as fromExam from './reducers';

@NgModule({
  declarations: [fromComponents.components],
  imports: [CommonModule, SharedModule, ExamsRoutingModule, StoreModule.forFeature(fromExam.examFeatureKey, fromExam.reducers, { metaReducers: fromExam.metaReducers })],
})
export class ExamsModule {}
