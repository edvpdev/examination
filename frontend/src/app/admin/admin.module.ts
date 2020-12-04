import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromComponents from './components';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [fromComponents.components],
  imports: [CommonModule, SharedModule, AdminRoutingModule],
})
export class AdminModule {}
