import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GeneralService } from './general.service';
import { SharedService } from './shared.service';
import 'hammerjs';
import {
  AccordionModule,
  BsDatepickerModule,
  CarouselModule,
  BsDropdownModule
} from 'ngx-bootstrap';

import { ReviewsortPipe } from './reviewsort.pipe';

import { InputFileModule } from 'ngx-input-file';

import { ModalModule } from 'ngx-bootstrap';

import { EqualValidator } from './equal.validator';
import {
  MatButtonModule,
  MatListModule,
  MatToolbarModule
} from '@angular/material';
import { environment } from '../environments/environment';
import { KntschemeGuard } from './kntscheme.guard';

import { InformationComponent } from './information/information.component';
import { SharedModule } from './shared/shared.module';
import { HomePageComponent } from './home-page/home-page.component';
import { EventsModule } from './events/events.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { TransferService } from './giftcard/datashare.service';
import { SupportComponent } from './support/support.component';

import { UtilsService } from './shared/utils';
import { CurrConvertPipe } from './shared/currency.pipe';
import { GiftcardComponent } from './giftcard/giftcard.component';
import { GiftcardCheckoutComponent } from './giftcard/giftcard-checkout/giftcard-checkout.component';

@NgModule({
  declarations: [
    HomePageComponent,
    ReviewsortPipe,
    ReviewsortPipe,
    EqualValidator,
    SupportComponent,
    GiftcardComponent,
    GiftcardCheckoutComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    ModalModule
  ],

  providers: [GeneralService, KntschemeGuard, SharedService, UtilsService,TransferService],
  bootstrap: [AppComponent]
})
export class AppModule {}
