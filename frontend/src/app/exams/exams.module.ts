import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamsRoutingModule } from './exams-routing.module';
import { SharedModule } from '@shared/shared.module';

import * as fromComponents from './components';

@NgModule({
  declarations: [fromComponents.components],
  imports: [CommonModule, SharedModule, ExamsRoutingModule],
})
export class ExamsModule {}
