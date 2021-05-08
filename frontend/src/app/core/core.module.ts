import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromCore from './reducers';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, StoreModule.forFeature(fromCore.coreFeatureKey, fromCore.reducers, { metaReducers: fromCore.metaReducers })],
})
export class CoreModule {}
