import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromComponents from './components';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromAdmin from './reducers';

@NgModule({
  declarations: [fromComponents.components],
  imports: [CommonModule, SharedModule, AdminRoutingModule, StoreModule.forFeature(fromAdmin.adminFeatureKey, fromAdmin.reducers, { metaReducers: fromAdmin.metaReducers })],
})
export class AdminModule {}
