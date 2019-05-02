import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MadeToOrderRoutingModule } from './made-to-order-routing.module';
import { MadeOrderComponent } from './made-order/made-order.component';

import { MadeOrderLoginComponent } from './made-order-login/made-order-login.component';
import { MadeorderPopupComponent } from './madeorder-popup/madeorder-popup.component';
import { SharedModule } from '../shared/shared.module';
import { QuotationComponent } from './Quotation/quotation/quotation.component';

@NgModule({
  imports: [CommonModule, MadeToOrderRoutingModule, SharedModule],
  declarations: [
    MadeOrderComponent,
    MadeOrderLoginComponent,
    MadeorderPopupComponent,
    QuotationComponent
  ]
})
export class MadeToOrderModule {}
