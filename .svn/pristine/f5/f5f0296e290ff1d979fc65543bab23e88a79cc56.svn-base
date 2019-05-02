import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareersRoutingModule } from './careers-routing.module';
import { CareerDetailsComponent } from './career-details/career-details.component';
import { CareerLoginComponent } from './career-login/career-login.component';
import { CareersApplyComponent } from './careers-apply/careers-apply.component';
import { SharedModule } from '../shared/shared.module';
import { PaginationModule, BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    CareersRoutingModule,
    SharedModule,
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    CareerDetailsComponent,
    CareerLoginComponent,
    CareersApplyComponent
  ]
})
export class CareersModule {}
