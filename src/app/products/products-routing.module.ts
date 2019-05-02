import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ReviewComponent } from './review/review.component';
import { BulkorderLoginComponent } from './bulkorder-login/bulkorder-login.component';
import { AddCartComponent } from './add-cart/add-cart.component';

const routes: Routes = [
  {
    path: 'add-to-cart',
    component: AddCartComponent,
    data: { title: 'Add to cart' }
  },
  {
    path: 'details/:id',
    component: ProductDetailsComponent,
    data: { title: 'Product Details' }
  },
  {
    path: 'review/:id',
    component: ReviewComponent,
    data: { title: 'Customer Review' }
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    data: { title: 'Payment Details' }
  },
  {
    path: 'bulk/login',
    component: BulkorderLoginComponent,
    data: { title: 'Bulk Order Login' }
  },
  {
    path: ':id',
    component: ProductPageComponent,
    data: { title: 'Product Page' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
