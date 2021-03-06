import {
  Component,
  OnInit,
  HostListener,
  ChangeDetectorRef,
  AfterViewInit
} from "@angular/core";
import { SharedService } from "../../shared.service";
import { GeneralService } from "../../general.service";
import { Router } from "@angular/router";
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, AfterViewInit {
  public user = window.localStorage.getItem("co-optex-userId");
  photoUrl: any = null;
  locationInfo = "Location";
  locationLoad = false;
  options = {
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 0
  };
  filterVlaue = "";
  wishlist: any = [];
  totalAmout: any;
  cartList: any = [];
  toggle = [false];
  toggleList = [false];
  clickedMenu1: any = "";
  subMenu: any;
  submenu: any;
  clickedMenu: any = "";
  menuData: any;
  showmenuListDetail = false;
  showmenuListDetail1 = false;
  showDiv1 = false;
  showDiv2 = false;
  showDiv3 = false;
  showDiv4 = false;
  showDiv = "";
  showLogin = "false";
  showMenu: Boolean = false;
  showMenu1: Boolean = false;
  userName: String = "";
  women: any = [];
  notificationcount: number;
  notificationList: any = [];
  dateStamp: any;
  showSearch = false;
  selectedItem1: any;
  userId = "";
  currentCurrencyIndex = 0;
  currencyList = [
    {
      name: "Indian Rupees",
      symbol: "Rs",
      code: "INR",
      country: "India",
      countryflag: ""
    },
    {
      name: 'US Dollar',
      symbol: '$',
      code: 'USD'
    },
    {
      name: 'England',
      symbol: '&pound;',
      code: 'GBP'
    }
  ];
  constructor(
    private generalService: GeneralService,
    private ss: SharedService,
    private router: Router,
    private notificationService: GeneralService,
    private allNotificationService: GeneralService,
     private toastr: ToastsManager,
    public cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    if (this.generalService.getUserId() != null) {
      this.getCartdetails1();
      this.notificationlist();
      this.allNotification();
      this.getWishlist();
      // this.userId = this.generalService.getUserId();
    }
    this.ss.$menuvalue.subscribe(res => {
      this.selectedItem1 = res;
    });

    this.ss.currentamount.subscribe(res => {
      this.totalAmout = res;
    });

    this.ss.currentcartList.subscribe(res => {
      this.cartList = res;
    });

    this.ss.currentnoticount.subscribe(res => {
      this.notificationcount = res;
    });

    this.ss.currentwishlist.subscribe(res => {
      this.wishlist = res;
    });

    this.ss.currentnotiList.subscribe(res => {
      this.notificationList = res;
    });

    this.getMenuList();
    this.ss.currentshowDiv4.subscribe(res => {
      this.showDiv4 = res;
    });
    this.ss.currentuserDetail.subscribe(res => {
      this.showLogin = res;
      this.userName = res.userName;
    });
    this.ss.currentpersonalInfo.subscribe(res => {
      this.photoUrl = res.photoUrl;
    });
    if (typeof localStorage !== 'undefined') {
      this.showLogin = localStorage.getItem('showLogin');
      if (this.showLogin == null) {
        this.showLogin = 'false';
      }
    }
    if (window.screen.width < 768) {
      this.showMenu = false;
    }
    this.ss.$searchValue.subscribe(res => {
      this.filterVlaue = res;
    });
    this.getLocation();
    const userName = localStorage.getItem('co-optex-userName');
    if (userName) {
      this.userName = userName;
    }
    this.generalService.getCurrencyValue('INR').subscribe(res => {
      const inrRate = res.rates['INR'];
      this.ss.changeCurrency({
        code: 'INR',
        rate: inrRate
      });
    });
  }

  public getCartdetails1() {
    let totalAmout = 0;
    const reqParam = this.generalService.getUserId();
    this.generalService.getRequest('cartDetails?id=' + reqParam).subscribe(
      res => {
        this.ss.changecartList(res.responseContent);
        for (let i = 0; i < res.responseContent.length; i++) {
          totalAmout = totalAmout + res.responseContent[i].totalAmount;
        }

        this.ss.changeamount(totalAmout);
      },
      e => {},
      () => {}
    );
  }

  public notificationlist() {
    this.generalService
      .getRequest('notificationCount?id=' + this.user)
      .subscribe(
        res => {
          this.ss.changenoticount(res.responseContents[0].notificationCount);
        },
        e => {},
        () => {}
      );
  }

  public allNotification() {
    this.generalService
      .getRequest('notificationDetails?id=' + this.user)
      .subscribe(
        res => {
          this.ss.changenotiList(res.responseContents);
        },
        e => {},
        () => {}
      );
  }

  getWishlist() {
    const reqParam = this.generalService.getUserId();
    this.generalService
      .getRequest('getUserWishlistInfo?id=' + reqParam)
      .subscribe(
        res => {
          //  this.wishlist=res.responseContents[0];
          this.ss.changewishlist(res.responseContent);
        },
        e => {},
        () => {}
      );
  }

  public clear() {
    this.ss.changeemail('');
    this.ss.changeemail1('');
    this.ss.changeconfirmpassword('');
    this.ss.changemobile('');
    this.ss.changepassword('');
    this.ss.changepassword1('');
    this.ss.changename('');
    this.ss.changeshowCaution(false);
    this.ss.changeshowPasswordCaution(false);
    this.ss.changeshowEmailCaution(false);
    this.ss.changesshowMobileCaution(false);
  }

  public showProducts(id) {
    this.ss.changemenuId(id);
    this.router.navigate(['/product', id]);
    this.mouseOutOnMenu();
  }

  public menuClick() {
    this.showMenu1 = !this.showMenu1;
  }

  public mouseOverOnMenu(menu) {
    this.showDiv = menu;
  }
  public mouseOutOnMenu() {
    this.showDiv = '';
  }
  public showSearchBar(value) {
    this.showSearch = !this.showSearch;
    this.ss.getSearchValue(value);
    this.ss.changemenuId('Allproduct');
    this.router.navigate(['product/Allproduct']);
  }

  listClick(event, newValue) {
    this.selectedItem1 = newValue;
  }
  goTender() {
    if (
      this.generalService.getUserId() !== undefined &&
      this.generalService.getUserId() !== null
    ) {
      const reqParam = this.generalService.getUserId();
      this.generalService
        .getRequest('supplier/master/checkSupplier?id=' + reqParam)
        .subscribe(
          res => {
            //  this.wishlist=res.responseContents;
            if (res.totalRecords === 1) {
              this.ss.showLoading(false);
              this.router.navigate(['tender']);
            } else {
              this.ss.showLoading(false);
              this.router.navigate(['tender/login']);
            }
          },
          e => {
            this.ss.showLoading(false);
          },
          () => {}
        );
    } else {
      this.router.navigate(['tender/login']);
    }
  }
  goBulkOrder() {
    if (
      this.generalService.getUserId() !== undefined &&
      this.generalService.getUserId() !== null
    ) {
      this.generalService
        .getRequest1(
          'bulkOrderRegisteredUser?id=' + this.generalService.getUserId()
        )
        .subscribe(
          res => {
            if (res.responseContent === true) {
              this.ss.changemenuId('Bulkorder');
              this.router.navigate(['/product', 'Bulkorder']);
            } else {
              this.router.navigate(['product/bulk/login']);
            }
          },
          e => {
            this.ss.showLoading(false);
          },
          () => {}
        );
    } else {
      this.router.navigate(['product/bulk/login']);
    }
  }
  viewAll() {
    const reqParam = {
      userId: this.generalService.getUserId()
    };
    this.generalService
      .postRequest('markAllNotificationRead', reqParam)
      .subscribe(res => {}, e => {}, () => {});
    // this.notificationcount = 0;
  }

  public notiseen() {
    const reqParam = {
      id: this.generalService.getUserId()
    };
    this.generalService
      .postRequest1('markAllNotificationRead', reqParam)
      .subscribe(
        res => {
          // this.notificationcount = res.totalRecords;
        },
        e => {},
        () => {}
      );
  }
  public changeStyle1() {
    this.showDiv1 = true;
  }
  public changeStyle11() {
    this.showDiv1 = false;
  }
  public changeStyle2() {
    this.showDiv2 = true;
  }
  public changeStyle22() {
    this.showDiv2 = false;
  }
  public changeStyle3() {
    this.showDiv3 = true;
    this.notiseen();
  }
  public changeStyle33() {
    this.showDiv3 = false;
  }
  public changeStyle4() {
    this.userId = this.generalService.getUserId();
    this.showDiv4 = true;
  }
  public changeStyle44() {
    this.showDiv4 = false;
  }
  toggleAccordion(arg) {
    this.toggle[arg] = !this.toggle[arg];
  }
  toggleIcon(arg) {
    this.toggleList[arg] = !this.toggleList[arg];
  }

  public showmenuList(menu) {
    this.clickedMenu1 = '';
    if (this.clickedMenu !== '') {
      this.clickedMenu = menu;
    } else {
      this.clickedMenu = '';
    }
    this.showmenuListDetail = !this.showmenuListDetail;
    this.subMenu = [];
    for (let i = 0; i < this.menuData.length; i++) {
      if (this.menuData[i].name === menu) {
        this.subMenu = this.menuData[i].subMenu;
      }
    }
  }
  public showmenuList1(menu) {
    this.clickedMenu1 = menu;
    this.showmenuListDetail1 = !this.showmenuListDetail1;
  }
  public getMenuList() {
    this.generalService.getRequest('AllMenuItems').subscribe(
      res => {
        this.menuData = res;
      },
      e => {},
      () => {}
    );
  }

  onEvent(event) {
    event.stopPropagation();
  }

  logout() {
     this.toastr.success('LoggedOut Successfully');
    localStorage.removeItem('');
    window.localStorage.removeItem('co-optex-sessionId');
    window.localStorage.removeItem('co-optex-userId');
    window.localStorage.removeItem('showLogin');
    window.localStorage.removeItem('co-optex-emailId');
    window.localStorage.removeItem('co-optex-userName');
    window.localStorage.removeItem('co-optex-location');
    this.showLogin = 'false';
    this.cartList = [];
    this.wishlist = [];
    this.notificationList = [];
    this.notificationcount = 0;
    this.userName = '';
    this.router.navigate(['/']);
  }
  getLocation() {
    this.locationLoad = true;

    this.locationInfo = '';
    const localAddress = localStorage.getItem('co-optex-location');
    if (localAddress) {
      this.locationInfo = localAddress;
      this.locationLoad = false;
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.displayLocation(
          position.coords.latitude,
          position.coords.longitude
        );
      });
    }
  }
  displayLocation(latitude, longitude) {
    const request = new XMLHttpRequest();

    const method = 'GET';
    const url =
      'http://maps.googleapis.com/maps/api/geocode/json?latlng=' +
      latitude +
      ',' +
      longitude +
      '&sensor=true';
    const async = true;
    request.open(method, url, async);
    request.onreadystatechange = () => {
      this.locationLoad = false;
      if (request.readyState === 4 && request.status === 200) {
        const data = JSON.parse(request.responseText);
        const address = data.results[0];
        if (address) {
          this.locationInfo = address.formatted_address;
          localStorage.setItem('co-optex-location', address.formatted_address);
        }
      }
    };
    request.send();
  }
  productDetail(id) {
    this.router.navigate(['/product/details', id]);
  }
  changeCurrency(currencyIndex) {
    this.currentCurrencyIndex = currencyIndex;
    const code = this.currencyList[this.currentCurrencyIndex].code;
    this.generalService.getCurrencyValue(code).subscribe(res => {
      const inrRate = res.rates['INR'];
      this.ss.changeCurrency({
        code: code,
        rate: inrRate
      });
    });
  }
}
