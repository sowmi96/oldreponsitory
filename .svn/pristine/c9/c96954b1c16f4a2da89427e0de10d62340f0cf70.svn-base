import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MadeOrderComponent } from './made-order/made-order.component';
import { MadeOrderLoginComponent } from './made-order-login/made-order-login.component';
import { MadeorderPopupComponent } from './madeorder-popup/madeorder-popup.component';
import { QuotationComponent } from '../made-to-order/Quotation/quotation/quotation.component';

const routes: Routes = [
  { path: 'order', component: MadeOrderComponent, data: { title: 'order' } },
  {
    path: '',
    component: MadeOrderLoginComponent,
    data: { title: 'madeorder_login' }
  },
  {
    path: 'quotation',
    component: QuotationComponent
  },
  {
    path: 'popup',
    component: MadeorderPopupComponent,
    data: { title: 'popup' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MadeToOrderRoutingModule {}
