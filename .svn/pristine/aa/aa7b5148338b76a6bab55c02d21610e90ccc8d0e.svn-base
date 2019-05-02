import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from '../../shared.service';
import { GeneralService } from '../../general.service';
import { ToastsManager } from 'ng2-toastr';
// import { KntSchemeLoginComponent } from '../knt-scheme-login/knt-scheme-login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  totalAmout: number;
  email: any = '';
  password: any;
  showLogin: Boolean = false;
  errorMessage: String = '';
  public user = window.localStorage.getItem('co-optex-userId');

  loginError = false;
  constructor(
    private ss: SharedService,
    private generalService: GeneralService,
    private toastr: ToastsManager,
    private router: Router
  ) {}

  @ViewChild('closeBtn') closeBtn: ElementRef;

  ngOnInit() {
    this.ss.currentshowlogin.subscribe(message => (this.showLogin = message));
    this.ss.currentpassword.subscribe(message => (this.password = message));
    this.ss.currentemail.subscribe(message => (this.email = message));
  }

  public clearField() {
    this.password = '';
    this.email = '';
    this.loginError = false;
  }

  public closeLogin() {
    this.closeBtn.nativeElement.click();
  }

  onLoginSubmit() {
    this.ss.getLoginData(false);
  }

  public getCartdetails1() {
    this.totalAmout = 0;
    const reqParam = this.generalService.getUserId();
    this.generalService.getRequest('cartDetails?id=' + reqParam).subscribe(
      res => {
        this.ss.changecartList(res.responseContent);
        for (let i = 0; i < res.responseContent.length; i++) {
          res.responseContent[i].totalCalculatedAmount =
            res.responseContent[i].totalAmount *
            res.responseContent[i].quantity;
        }
        for (let i = 0; i < res.responseContent.length; i++) {
          this.totalAmout =
            this.totalAmout + res.responseContent[i].totalCalculatedAmount;
        }
        this.ss.changeamount(this.totalAmout);
      },
      e => {},
      () => {}
    );
  }

  public notificationlist() {
    const reqParam = this.generalService.getUserId();

    this.generalService
      .getRequest('notificationCount?id=' + reqParam)
      .subscribe(
        res => {
          this.ss.changenoticount(res.responseContents[0].notificationCount);
        },
        e => {},
        () => {}
      );
  }

  public allNotification() {
    const reqParam = this.generalService.getUserId();

    this.generalService
      .getRequest('notificationDetails?id=' + reqParam)
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
          this.ss.changewishlist(res.responseContent);
        },
        e => {},
        () => {}
      );
  }

  public login() {
    this.loginError = false;
    const reqParam = {
      emailId: this.email,
      password: this.password
    };
    if (this.email === '' || this.password === '') {
      this.errorMessage = 'Please enter all the values';
      this.loginError = true;
    } else {
      this.ss.showLoading(true);
      this.generalService.postRequest('signIn', reqParam).subscribe(
        res => {
           this.toastr.success('Successfully logged In ');
          this.ss.showLoading(false);
          this.ss.changeshowlogin(true);
          this.ss.changeuserDetail(res.authenticatedUser);
          if (typeof localStorage !== 'undefined') {
            window.localStorage.setItem(
              'co-optex-sessionId',
              res['XSRF-TOKEN']
            );
            window.localStorage.setItem(
              'co-optex-userId',
              res.authenticatedUser.id
            );
            window.localStorage.setItem(
              'co-optex-userName',
              res.authenticatedUser.userName
            );

            window.localStorage.setItem('showLogin', 'true');
            window.localStorage.setItem('co-optex-emailId', this.email);
            this.ss.senduserInfo(res.authenticatedUser.id);
            this.ss.userDetails(res.authenticatedUser);
            this.getCartdetails1();
            this.notificationlist();
            this.allNotification();
            this.getWishlist();
          }
          this.ss.changeshowDiv4(false);
          this.closeLogin();
          this.ss.checkuserId(res.authenticatedUser.id);
          if (location.hash === '#/tender/login') {
            this.goTender();
          }
          this.email = '';
          this.password = '';
        },
        e => {
          this.errorMessage =
            e.error.error || 'Something went wrong.Please try again';
          this.loginError = true;
          this.ss.showLoading(false);
        },
        () => {}
      );
    }
  }
  goTender() {
    if (
      this.generalService.getUserId() !== undefined &&
      this.generalService.getUserId() != null
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
}
