import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NouisliderModule } from 'ng2-nouislider';
import { ImageZoomModule } from 'angular2-image-zoom';
import { NgPipesModule } from 'ngx-pipes';

import { ReviewComponent } from './review/review.component';
import { BulkorderChartComponent } from './bulkorder-chart/bulkorder-chart.component';
import { AddCartComponent } from './add-cart/add-cart.component';
import { BulkorderLoginComponent } from './bulkorder-login/bulkorder-login.component';
import { AccordionModule, PaginationModule, RatingModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    NouisliderModule,
    NgPipesModule,
    ImageZoomModule,
    AccordionModule.forRoot(),
    PaginationModule.forRoot(),
    RatingModule.forRoot()
  ],
  declarations: [
    ProductPageComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    AddCartComponent,
    BulkorderChartComponent,
    ReviewComponent,
    BulkorderLoginComponent
  ],
  exports: [
    ProductPageComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    AddCartComponent,
    ReviewComponent,
    BulkorderChartComponent,
    BulkorderLoginComponent
  ]
})
export class ProductsModule {}
