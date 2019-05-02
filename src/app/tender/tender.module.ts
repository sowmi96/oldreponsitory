import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenderRoutingModule } from './tender-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TenderLoginComponent } from './tender-login/tender-login.component';
import { TenderComponent } from './tender.component';
import { PaginationModule, AccordionModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    TenderRoutingModule,
    SharedModule,
    AccordionModule.forRoot(),
    PaginationModule.forRoot()
  ],
  declarations: [TenderLoginComponent, TenderComponent],
  exports: [TenderLoginComponent, TenderComponent]
})
export class TenderModule {}
