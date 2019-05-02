import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';

import { KntschemeGuard } from './kntscheme.guard';

import { HomePageComponent } from './home-page/home-page.component';
import { WishlistComponent } from './core/wishlist/wishlist.component';
import { ResetPasswordComponent } from './core/reset-password/reset-password.component';
import { NotificationComponent } from './core/notification/notification.component';
import { SuccessComponent } from './core/success/success.component';
import { FailureComponent } from './core/failure/failure.component';
import { GiftcardCheckoutComponent } from './giftcard/giftcard-checkout/giftcard-checkout.component';
import { GiftcardComponent } from './giftcard/giftcard.component';
import { SupportComponent } from './support/support.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'support',
    component: SupportComponent
  },

  {
    path: 'wishlist',
    component: WishlistComponent,
    data: { title: 'Wishlist' }
  },
  {
    path: 'reset_password',
    component: ResetPasswordComponent,
    data: { title: 'Reset Password' }
  },
  {
    path: 'notification',
    component: NotificationComponent,
    data: { title: 'Reset Password' }
  },
  { path: 'success', component: SuccessComponent, data: { title: 'Success' } },
  { path: 'failure', component: FailureComponent, data: { title: 'Failure' } },
  {
    path: 'profile',
    loadChildren:
      'app/user-information/user-information.module#UserInformationModule'
  },
  {
    path: 'knt_scheme',
    loadChildren: 'app/knt-scheme/knt-scheme.module#KntSchemeModule'
  },

  {
    path: 'tender',
    loadChildren: 'app/tender/tender.module#TenderModule'
  },
  { path: 'event', loadChildren: 'app/events/events.module#EventsModule' },
  {
    path: 'product',
    loadChildren: 'app/products/products.module#ProductsModule'
  },
  {
    path: 'information',
    loadChildren: 'app/information/information.module#InformationModule'
  },
  {
    path: 'madeOrder',
    loadChildren: 'app/made-to-order/made-to-order.module#MadeToOrderModule'
  },
  {
    path: 'career',
    loadChildren: 'app/careers/careers.module#CareersModule'
  },
  {
    path: 'giftcard',
    component: GiftcardComponent
  },
   {
    path: 'giftcard/giftcard-checkout',
    component: GiftcardCheckoutComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
