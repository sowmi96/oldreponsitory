import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeneralService } from '../../general.service';
import { ToastsManager } from 'ng2-toastr';
import { RouterModule, Router } from '@angular/router';
import { SharedService } from '../../shared.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit, OnDestroy {
  private subscription: ISubscription;
  private subscriptionnew: ISubscription;
  currencyRate: any;
  private subscriptionCurrency: ISubscription;
  updateCartLoad = false;
  showAvailableError = false;
  pathname: string;
  totalAmout: number;
  cartList: any = [];
  public cartdata: any = [];
  public totalcart: any = [];
  quantity: any;
  public selectedItem1: any;

  constructor(
    private ss: SharedService,
    private cartservice: GeneralService,
    private toastr: ToastsManager,
    public router: Router
  ) {
    this.pathname = window.location.hash;
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
    // this.subscriptionnew.unsubscribe();
    this.subscriptionCurrency.unsubscribe();
  }
  ngOnInit() {
    this.subscriptionCurrency = this.ss.currency$.subscribe(res => {
      this.currencyRate = res;
    });
    this.ss.showLoading(true);
    this.getCartdetails1();
  }
  checkAvailability(value) {
    this.showAvailableError = false;
    if (value.quantity > value.availableQuantity) {
      this.showAvailableError = true;
      return false;
    }
    if (value.quantity == null) {
      setTimeout(() => {
        value.quantity = 1;
      }, 0);
    }

    return true;
  }

  increaseValue(value) {
    this.checkAvailability(value);
    if (value.quantity < value.availableQuantity) {
      value.quantity = value.quantity + 1;
      const finalRequest = {
        userCartId: value.id,
        userMasterId: this.cartservice.getUserId(),
        quantity: value.quantity
      };
      value.totalCalculatedAmount = value.totalAmount;
      this.totalAmout = 0;
      for (let i = 0; i < this.cartList.length; i++) {
        this.totalAmout =
          this.totalAmout + this.cartList[i].totalCalculatedAmount;
      }
      this.updateCartLoad = true;
      this.cartservice.postRequest1('updateCart', finalRequest).subscribe(
        res => {
          this.updateCartLoad = false;
          this.ss.changeamount(this.totalAmout);
          this.getCartdetails1();
        },
        e => {
          this.updateCartLoad = false;
          this.toastr.error('Failed to add to cart');
        },
        () => {}
      );
    }
  }

  deletecart(id) {
    const reqParam = {
      id: id,
      userId: this.cartservice.getUserId()
    };
    this.cartservice.postRequest1('removecart', reqParam).subscribe(
      res => {
        this.toastr.success('product is removed from Cart');
        this.getCartdetails1();
      },
      e => {
        this.toastr.error('Could not remove from Cart');
      },
      () => {}
    );
  }
  public getCartdetails1() {
    this.ss.showLoading(true);
    this.totalAmout = 0;
    const reqParam = this.cartservice.getUserId();
    this.cartservice.getRequest('cartDetails?id=' + reqParam).subscribe(
      res => {
        this.cartList = res.responseContent;
        for (let i = 0; i < this.cartList.length; i++) {
          this.cartList[i].totalCalculatedAmount = this.cartList[i].totalAmount;
        }
        for (let i = 0; i < this.cartList.length; i++) {
          this.totalAmout =
            this.totalAmout + this.cartList[i].totalCalculatedAmount;
        }
        this.ss.showLoading(false);
        this.ss.changecartList(this.cartList);
        this.ss.changeamount(this.totalAmout);
      },
      e => {
        this.ss.showLoading(false);
      },
      () => {}
    );
  }

  decreaseValue(value) {
    if (value.quantity > 1) {
      value.quantity = value.quantity - 1;

      const finalRequest = {
        userCartId: value.id,
        userMasterId: this.cartservice.getUserId(),
        quantity: value.quantity
      };
      this.cartservice.postRequest1('updateCart', finalRequest).subscribe(
        res => {
          this.totalAmout = 0;
          value.totalCalculatedAmount = value.totalAmount;
          for (let i = 0; i < this.cartList.length; i++) {
            this.totalAmout =
              this.totalAmout + this.cartList[i].totalCalculatedAmount;
          }
          this.ss.changeamount(this.totalAmout);
          this.getCartdetails1();
        },
        e => {
          this.toastr.error('updated failed');
        },
        () => {}
      );
    }
  }
  getWishlist() {
    const reqParam = this.cartservice.getUserId();
    //  this.ss.showLoading(true);
    this.cartservice.getRequest('getUserWishlistInfo?id=' + reqParam).subscribe(
      res => {
        this.ss.changewishlist(res.responseContent);
      },
      e => {
        this.ss.showLoading(false);
      },
      () => {}
    );
  }

  listClick(event, newValue) {
    this.selectedItem1 = newValue.id;
    const finalRequest = {
      userId: this.cartservice.getUserId(),
      cartId: newValue.id
    };
    this.cartservice.postRequest1('MoveToWishList', finalRequest).subscribe(
      res => {
        this.getCartdetails1();
        this.getWishlist();
      },
      e => {
        this.toastr.error('Failted to move to wishlist');
      },
      () => {}
    );
  }
  product() {
    this.ss.changemenuId('Allproduct');
    this.router.navigate(['product/Allproduct']);
  }
  public productDetail(id) {
    this.router.navigate(['/product/details', id]);
  }
}
