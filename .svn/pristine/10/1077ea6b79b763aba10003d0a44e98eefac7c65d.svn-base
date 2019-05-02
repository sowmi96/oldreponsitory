import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeneralService } from '../../general.service';
import { ToastsManager } from 'ng2-toastr';
import { RouterModule, Router } from '@angular/router';
import { SharedService } from '../../shared.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, OnDestroy {
  max = 5;
  public wishlist: any = [];
  rate = 3;
  isReadonly = true;
  currencyRate: any;
  private subscriptionCurrency: ISubscription;
  constructor(
    private wishservice: GeneralService,
    private toastr: ToastsManager,
    private ss: SharedService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getWishlist();

    this.subscriptionCurrency = this.ss.currency$.subscribe(res => {
      this.currencyRate = res;
    });
  }
  ngOnDestroy() {
    this.subscriptionCurrency.unsubscribe();
  }
  getWishlist() {
    const reqParam = this.wishservice.getUserId();
    this.ss.showLoading(true);
    this.wishservice.getRequest('getUserWishlistInfo?id=' + reqParam).subscribe(
      res => {
        this.wishlist = res.responseContent;
        this.ss.showLoading(false);
        this.ss.changewishlist(this.wishlist);
      },
      e => {
        this.ss.showLoading(false);
      },
      () => {}
    );
  }

  deleteWishlist(id) {
    const reqParam = {
      userId: this.wishservice.getUserId(),
      productId: id
    };
    this.wishservice
      .postRequest1('deleteWishListByProductId', reqParam)
      .subscribe(
        res => {
          this.getWishlist();
        },
        e => {},
        () => {}
      );
  }
  gotoProduct() {
    this.ss.changemenuId('Allproduct');
    this.router.navigate(['product/Allproduct']);
  }

  public productDetail(id) {
    this.router.navigate(['/product/details', id]);
  }
}
