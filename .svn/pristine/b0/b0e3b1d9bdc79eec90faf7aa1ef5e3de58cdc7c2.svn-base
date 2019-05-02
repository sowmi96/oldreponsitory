import { ShowLoadingComponent } from "../../core/show-loading/show-loading.component";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { SharedService } from "../../shared.service";
import { GeneralService } from "../../general.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
import { OnDestroy } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: "app-product-page",
  templateUrl: "./product-page.component.html",
  styleUrls: ["./product-page.component.css"]
})
export class ProductPageComponent implements OnInit, OnDestroy {
  mainCategory: any;
  private subscription: ISubscription;
  private subscriptionnew: ISubscription;
  productName: any = "";
  breadCrumbDetailsValue: any = {};
  ocassionId: any = [];
  workid: any = [];
  useridData: string;
  menuName: any;
  pageSize: any = 10;
  pageNO: any = 1;
  sortData = "HighToLow";
  discountChecked = false;
  meterialChecked = false;
  mindiscount: any = 0;
  ratingid: any = [];
  discountid: any = [];
  matirialid: any = [];
  catid: any = [];
  colorid: any = [];
  categoryList: any = {};
  menuId: any = "";
  proddetail: any = [];
  productlist: any = [];
  someRange = [0, 200000];
  public data = false;
  public show = false;
  minRange: any = "100";
  maxRange: any = "200000";
  public productDetails: any = [];
  public products: any = [];
  toggle = [false, false, false, false, false, false, false];
  public shouldShow = true;
  discount = [
    {
      id: "0",
      name: "0-10%",
      selected: false
    },
    {
      id: "10",
      name: "10% or more",
      selected: false
    },
    {
      id: "20",
      name: "20% or more",
      selected: false
    },
    {
      id: "30",
      name: "30% or more",
      selected: false
    },
    {
      id: "40",
      name: "40% or more",
      selected: false
    },
    {
      id: '50',
      name: '50% or more',
      selected: false
    }
  ];
  rating = [
    {
      id: 3,
      name: '3',
      selected: 'false'
    },
    {
      id: 4,
      name: '4',
      selected: 'false'
    },
    {
      id: 5,
      name: '5',
      selected: 'false'
    }
  ];
  options = [
    'Popularity',
    'Price Low to High',
    'Price High to Low',
    'Newest First'
  ];
  model = { options: '' };
  public items = [
    { name: 'Price High to Low', value: 'HighToLow' },
    { name: 'Price Low to High', value: 'LowToHigh' }
  ];
  private value: any = {};
  private _disabledV = '0';
  private disabled = false;
  @ViewChild('filter') openFilter: ElementRef;
  currencyRate: any;
  private subscriptionCurrency: ISubscription;
  constructor(
    private ss: SharedService,
    private generalService: GeneralService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastsManager
  ) {}
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionnew.unsubscribe();
    this.subscriptionCurrency.unsubscribe();
  }
  ngOnInit() {
    // this.ss.selectedmenu("-1");
    this.subscriptionnew = this.ss.$senduserInfoData.subscribe(res => {
      this.useridData = res;
      this.getproducts1();
    });
    this.subscriptionCurrency = this.ss.currency$.subscribe(res => {
      this.currencyRate = res;
    });

    this.useridData = this.generalService.getUserId();

    this.ss.showLoading(true);
    this.subscription = this.ss.currentmenuId.subscribe(res => {
      this.menuId = res;

      this.productName = this.ss.searchValueData;
      if (this.menuId === '') {
        this.route.params.subscribe((params: Params) => {
          this.menuId = params['id'];
        });
      }

      if (this.menuId === 'Bulkorder') {
        this.breadCrumbDetailsValue = {};
        this.getproductsbulkOrder();
        this.mainCategory = 'Bulkorder';
        this.ss.selectedmenu('2');
      } else if (this.menuId === 'Allproduct') {
        this.breadCrumbDetailsValue = {};
        this.menuId = null;
        const color = this.ss.getColor();
        if (color !== null) {
          this.colorid.push(this.ss.getColor());
        }

        this.getproducts1();
        this.mainCategory = 'Allproduct';
        this.ss.selectedmenu('-1');
      } else {
        this.getproducts1();
        this.breadCrumbDetails();
        this.ss.selectedmenu('-1');
      }
    });

    this.getcatlist();
    this.products = this.productDetails.slice(0, 9);
    const accordian = document.getElementsByClassName('accordion');
    let i;
    for (i = 0; i < accordian.length; i++) {
      accordian[i].addEventListener('click', function() {
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (panel.style.display === 'block') {
          panel.style.display = 'none';
        } else {
          panel.style.display = 'block';
        }
      });
    }
  }

  onChange(e) {
    this.minRange = Math.round(e[0]);
    this.maxRange = Math.round(e[1]);
    this.goFunction();
  }
  onChange1(e) {
    this.minRange = Math.round(e[0]);
    this.maxRange = Math.round(e[1]);
  }
  toggleIcon(arg) {
    this.toggle[arg] = !this.toggle[arg];
  }
  showFilter() {
    this.data = !this.data;
  }
  showSort() {
    this.show = !this.show;
  }

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {}

  public removed(value: any): void {}

  public typed(value: any): void {}

  public refreshValue(value: any): void {
    this.value = value;
  }

  public getproducts1() {
    this.ss.showLoading(true);
    const data = {
      menuId: this.menuId,
      categoryId: this.catid,
      minDiscount: this.mindiscount,
      maxDiscount: 100,
      colorId: this.colorid,
      materialId: this.matirialid,
      maxPrice: this.maxRange,
      minPrice: this.minRange,
      customerRating: this.ratingid,
      workId: this.workid,
      productName: this.productName,
      ocassionId: this.ocassionId,
      userId: this.useridData,
      paginationDTO: {
        pageNo: this.pageNO,
        pageSize: this.pageSize,
        sortField: 'price',
        sortOrder: this.sortData
      }
    };

    this.generalService.postRequest('listAllProducts', data).subscribe(
      res => {
        this.productlist = res.responseContent;
        this.proddetail = res.responseContent;
        this.ss.showLoading(false);
      },
      e => {
        this.ss.showLoading(false);
      },
      () => {
        /*alert('login successfull');*/
      }
    );
  }
  public getproductsbulkOrder() {
    this.ss.showLoading(true);
    const data = {
      menuId: null,
      categoryId: this.catid,
      minDiscount: this.mindiscount,
      maxDiscount: 100,
      colorId: this.colorid,
      materialId: this.matirialid,
      maxPrice: this.maxRange,
      minPrice: this.minRange,
      customerRating: this.ratingid,
      ocassionId: this.ocassionId,
      productName: this.productName,
      workId: [],
      userId: this.useridData,
      paginationDTO: {
        pageNo: this.pageNO,
        pageSize: this.pageSize,
        sortField: 'price',
        sortOrder: this.sortData
      }
    };

    this.generalService
      .postRequest1('bulkOrderListAllProducts', data)
      .subscribe(
        res => {
          this.ss.showLoading(false);
          this.productlist = res.responseContent;
          this.proddetail = res.responseContent;
        },
        e => {
          this.ss.showLoading(false);
        },
        () => {}
      );
  }
  public getcatlist() {
    this.generalService.getRequest1('ListAllProductFilters').subscribe(
      res => {
        this.categoryList = res.responseContent;
        const evilResponseProps = Object.keys(this.categoryList);
        evilResponseProps.forEach(element => {
          this.categoryList[element].forEach(ele => {
            ele.selected = 'false';
          });
        });

        if (this.colorid.length > 0) {
          this.categoryList['ecommFilterColors'].forEach(element => {
            if (element.id === this.colorid[0]) {
              element.selected = 'true';
            }
          });
        }
      },
      e => {
        this.ss.showLoading(false);
      },
      () => {
        /*alert('login successfull');*/
      }
    );
  }
  goFunction() {
    if (this.menuId !== 'Bulkorder') {
      this.getproducts1();
    } else {
      this.getproductsbulkOrder();
    }
  }
  public productDetail(id) {
    this.router.navigate(['/product/details', id]);
  }
  getcatvalue(events, id) {
    const event = events.target.checked;
    if (event) {
      this.catid.push(id);
    } else {
      const index: number = this.catid.indexOf(id);
      if (index !== -1) {
        this.catid.splice(index, 1);
      }
    }
    if (this.menuId !== 'Bulkorder') {
      this.getproducts1();
    }
  }
  getcolorvalue(events, x) {
    const event = events.target.checked;
    if (event) {
      this.colorid.push(x.id);
      x.selected = 'true';
    } else {
      const index: number = this.colorid.indexOf(x.id);
      if (index !== -1) {
        this.colorid.splice(index, 1);
      }
      x.selected = 'false';
    }
    if (this.menuId !== 'Bulkorder') {
      this.getproducts1();
    } else {
      this.getproductsbulkOrder();
    }
  }
  getMatirial(events, id) {
    const event = events.target.checked;
    if (event) {
      this.matirialid.push(id.id);
      id.selected = 'true';
    } else {
      const index: number = this.matirialid.indexOf(id);
      if (index !== -1) {
        this.matirialid.splice(index, 1);
      }
      id.selected = 'false';
      // this.matirialid.splice(1,id);
    }
    if (this.menuId !== 'Bulkorder') {
      this.getproducts1();
    } else {
      this.getproductsbulkOrder();
    }
  }
  discountValue(events, id) {
    const event = events.target.checked;
    if (event) {
      this.discountid.push(id.id);
      id.selected = true;
    } else {
      const index: number = this.discountid.indexOf(id.id);
      if (index !== -1) {
        this.discountid.splice(index, 1);
      }
      id.selected = false;
    }
    const minvalue = Math.min.apply(Math, this.discountid);
    this.mindiscount = minvalue;
    if (this.menuId !== 'Bulkorder') {
      this.getproducts1();
    } else {
      this.getproductsbulkOrder();
    }
  }
  ratingvalue(events, id) {
    const event = events.target.checked;
    if (event) {
      this.ratingid.push(id.id);
      id.selected = 'true';
    } else {
      const index: number = this.ratingid.indexOf(id.id);
      if (index !== -1) {
        this.ratingid.splice(index, 1);
      }
      id.selected = 'false';
    }
    if (this.menuId !== 'Bulkorder') {
      this.getproducts1();
    } else {
      this.getproductsbulkOrder();
    }
  }

  pageChanged($event) {
    this.pageNO = $event.page;
    this.pageSize = $event.itemsPerPage;
    if (this.menuId !== 'Bulkorder') {
      this.getproducts1();
    } else {
      this.getproductsbulkOrder();
    }
  }
  Sortdata(value) {
    this.sortData = value;
    if (this.menuId !== 'Bulkorder') {
      this.getproducts1();
    } else {
      this.getproductsbulkOrder();
    }
  }
  getwhilistdata(x) {
    if (x.wishList === true) {
      x.wishList = false;
      const data = {
        userId: this.generalService.getUserId(),
        productId: x.productId
      };
      this.generalService
        .postRequest1('deleteWishListByProductId', data)
        .subscribe(
          res => {
            this.getWishlist();
          },
          e => {
            this.ss.showLoading(false);
          },
          () => {}
        );
    } else {
      x.wishList = true;
      const data = {
        userId: this.generalService.getUserId(),
        productId: x.productId
      };
      this.generalService
        .postRequest1('AddToWishListByProductId', data)
        .subscribe(
          res => {
            this.getWishlist();
          },
          e => {
            this.ss.showLoading(false);
          },
          () => {}
        );
    }
  }
  clearColor(value) {
    this.categoryList[value].forEach(ele => {
      ele.selected = 'false';
    });
    this.colorid = [];
    if (this.menuId !== 'Bulkorder') {
      this.getproducts1();
    } else {
      this.getproductsbulkOrder();
    }
  }

  clearwork(value) {
    this.categoryList[value].forEach(ele => {
      ele.selected = 'false';
    });
    this.workid = [];
    if (this.menuId !== 'Bulkorder') {
      this.getproducts1();
    } else {
      this.getproductsbulkOrder();
    }
  }
  clearMaterial(value) {
    this.categoryList[value].forEach(ele => {
      ele.selected = 'false';
    });
    this.matirialid = [];
    if (this.menuId !== 'Bulkorder') {
      this.getproducts1();
    } else {
      this.getproductsbulkOrder();
    }
  }
  clearDiscount() {
    this.discount.forEach(ele => {
      ele.selected = false;
    });
    this.mindiscount = 0;
    if (this.menuId !== 'Bulkorder') {
      this.getproducts1();
    } else {
      this.getproductsbulkOrder();
    }
  }
  clearOcassion(value) {
    this.categoryList[value].forEach(ele => {
      ele.selected = 'false';
    });
    this.ocassionId = [];
    if (this.menuId !== 'Bulkorder') {
      this.getproducts1();
    } else {
      this.getproductsbulkOrder();
    }
  }

  getWorkvalue(events, x) {
    const event = events.target.checked;
    if (event) {
      this.ocassionId.push(x.id);
      x.selected = 'true';
    } else {
      const index: number = this.ocassionId.indexOf(x.id);
      if (index !== -1) {
        this.ocassionId.splice(index, 1);
      }
      x.selected = 'false';
      // this.colorid.splice(1,id);
    }
    if (this.menuId !== 'Bulkorder') {
      this.getproducts1();
    } else {
      this.getproductsbulkOrder();
    }
  }

  getOccassionvalue(events, x) {
    const event = events.target.checked;
    if (event) {
      this.ocassionId.push(x.id);
      x.selected = 'true';
    } else {
      const index: number = this.ocassionId.indexOf(x.id);
      if (index !== -1) {
        this.ocassionId.splice(index, 1);
      }
      x.selected = 'false';
    }
    if (this.menuId !== 'Bulkorder') {
      this.getproducts1();
    } else {
      this.getproductsbulkOrder();
    }
  }
  breadCrumbDetails() {
    this.generalService
      .getRequest1('breadCrumbDetails?id=' + this.menuId)
      .subscribe(
        res => {
          this.breadCrumbDetailsValue = res.responseContent;
          this.mainCategory = this.breadCrumbDetailsValue.categoryName;
        },
        e => {
          this.ss.showLoading(false);
        },
        () => {}
      );
  }
  getWishlist() {
    const reqParam = this.generalService.getUserId();
    //  this.ss.showLoading(true);
    this.generalService
      .getRequest('getUserWishlistInfo?id=' + reqParam)
      .subscribe(
        res => {
          this.ss.changewishlist(res.responseContent);
        },
        e => {
          this.ss.showLoading(false);
        },
        () => {}
      );
  }

  public breadcrumsClick(id) {
    this.router.navigate(['/product', id]);
    this.menuId = id;
    this.getproducts1();
    this.breadCrumbDetails();
  }
}
