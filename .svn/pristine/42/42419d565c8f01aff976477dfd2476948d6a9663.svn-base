import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxCarouselModule } from 'ngx-carousel';
import { ErrorsHandler } from './error-handler';
import { SharedService } from '../shared.service';
import { CurrConvertPipe } from './currency.pipe';

@NgModule({
  imports: [],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCarouselModule,
    RouterModule,
    CurrConvertPipe
  ],
  declarations: [CurrConvertPipe],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler
    }
  ]
})
export class SharedModule {}
