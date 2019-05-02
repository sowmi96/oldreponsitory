import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationComponent } from './notification/notification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CancelComponent } from './cancel/cancel.component';

import { SuccessComponent } from './success/success.component';
import { LoginComponent } from './login/login.component';
import { ShowLoadingComponent } from './show-loading/show-loading.component';

import { HeaderComponent } from './header/header.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FooterComponent } from './footer/footer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharedModule } from '../shared/shared.module';

import { DefaultComponent } from './default/default.component';
import { AppComponent } from '../app.component';
import { BsDropdownModule, RatingModule } from 'ngx-bootstrap';
import { FailureComponent } from './failure/failure.component';
import { WishlistComponent } from './wishlist/wishlist.component';

import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    CommonModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    RatingModule.forRoot()
  ],
  declarations: [
    NotificationComponent,
    ResetPasswordComponent,
    FailureComponent,
    CancelComponent,
    SuccessComponent,
    LoginComponent,
    ShowLoadingComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    HeaderComponent,
    DefaultComponent,
    FooterComponent,
    HeaderComponent,
    WishlistComponent,
    AppComponent
  ]
})
export class CoreModule {}
