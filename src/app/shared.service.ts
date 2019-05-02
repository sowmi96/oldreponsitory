import { Injectable, Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GeneralService } from './general.service';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class SharedService {
  colorFilter = null;
  initialmenu: any;
  searchValueData: any;
  private personalInfo = new BehaviorSubject<any>({});
  currentpersonalInfo = this.personalInfo.asObservable();

  private showlogin = new BehaviorSubject<any>([]);
  currentshowlogin = this.showlogin.asObservable();

  private username = new BehaviorSubject<any>([]);
  currentuserName = this.username.asObservable();

  private menuId = new BehaviorSubject<any>('');
  currentmenuId = this.menuId.asObservable();

  private userDetail = new BehaviorSubject<any>([]);
  currentuserDetail = this.userDetail.asObservable();

  private senduserInfoData = new Subject<any>();
  $senduserInfoData = this.senduserInfoData.asObservable();

  private searchValue = new BehaviorSubject<any>(this.searchValueData);
  $searchValue = this.searchValue.asObservable();

  private menuvalue = new BehaviorSubject<any>(this.initialmenu);
  $menuvalue = this.menuvalue.asObservable();

  private showDiv4 = new Subject<any>();
  currentshowDiv4 = this.showDiv4.asObservable();

  private wishlist = new Subject<any>();
  currentwishlist = this.wishlist.asObservable();

  private notiList = new Subject<any>();
  currentnotiList = this.notiList.asObservable();

  private noticount = new Subject<any>();
  currentnoticount = this.noticount.asObservable();

  private cartList = new Subject<any>();
  currentcartList = this.cartList.asObservable();

  private amount = new Subject<any>();
  currentamount = this.amount.asObservable();

  private logoutValue = new Subject<any>();
  logoutValue$ = this.logoutValue.asObservable();

  private email = new BehaviorSubject<any>('');
  currentemail = this.email.asObservable();

  private email1 = new BehaviorSubject<any>('');
  currentemail1 = this.email1.asObservable();

  private password = new BehaviorSubject<any>('');
  currentpassword = this.password.asObservable();

  private password1 = new BehaviorSubject<any>(1);
  currentpassword1 = this.password1.asObservable();

  private currency = new BehaviorSubject<any>('');
  currency$ = this.currency.asObservable();

  public sampleVar = 'Test';
  public loc = location.href;
  public locSplit = this.loc.split('/');
  public fbaseUrl = this.locSplit[0] + '//' + this.locSplit[2];
  private newBaseUrl = this.fbaseUrl;
  private mobile = new BehaviorSubject<any>('');
  currentmobile = this.mobile.asObservable();

  private userName = new Subject<string>();
  private loadSubject = new Subject<any>();
  private openLogin = new Subject<any>();
  private userObject = new Subject<any>();
  private KntschemePresent = new BehaviorSubject<Object>(0);
  private userLoginSuccess = new Subject<any>();
  private showEmailCaution = new BehaviorSubject<any>(false);
  currentshowEmailCaution = this.showEmailCaution.asObservable();

  userName$ = this.userName.asObservable();
  public loadSubject$ = this.loadSubject.asObservable();
  public openLogin$ = this.openLogin.asObservable();
  public userObject$ = this.userObject.asObservable();
  public userLoginSuccess$ = this.userLoginSuccess.asObservable();
  public KntschemePresent$ = this.KntschemePresent.asObservable();
  private showCaution = new BehaviorSubject<any>(false);
  currentshowCaution = this.showCaution.asObservable();

  private showMobileCaution = new BehaviorSubject<any>(false);
  currentshowMobileCaution = this.showMobileCaution.asObservable();

  private showPasswordCaution = new BehaviorSubject<any>(false);
  currentshowPasswordCaution = this.showPasswordCaution.asObservable();

  private confirmpassword = new BehaviorSubject<any>(false);
  currentconfirmpassword = this.confirmpassword.asObservable();

  private name = new BehaviorSubject<any>('');
  currentname = this.name.asObservable();

  checkuserId(x) {
    this.userLoginSuccess.next(x);
  }
  kntschemeset(scheme) {
    window.localStorage.setItem('schemeaccess', scheme);
    const data = localStorage.getItem('schemeaccess');
    this.KntschemePresent.next(data);
  }

  changepersonalInfo(personalInfo: any) {
    this.personalInfo.next(personalInfo);
  }

  changewishlist(wishlist: any) {
    this.wishlist.next(wishlist);
  }

  changenotiList(notiList: any) {
    this.notiList.next(notiList);
  }
  changenoticount(noticount: any) {
    this.noticount.next(noticount);
  }

  changecartList(cartList: any) {
    this.cartList.next(cartList);
  }
  changeamount(amount: any) {
    this.amount.next(amount);
  }

  changemenuId(id: any) {
    this.menuId.next(id);
  }

  changeshowlogin(Showlogin: any) {
    this.showlogin.next(Showlogin);
  }

  changeshowDiv4(showDiv4: any) {
    this.showDiv4.next(showDiv4);
  }

  changeemail(email: any) {
    this.email.next(email);
  }
  changeemail1(email1: any) {
    this.email1.next(email1);
  }
  changepassword(password: any) {
    this.password.next(password);
  }
  changepassword1(password1: any) {
    this.password1.next(password1);
  }
  changeconfirmpassword(confirmpassword: any) {
    this.confirmpassword.next(confirmpassword);
  }
  changename(name: any) {
    this.name.next(name);
  }
  changemobile(mobile: any) {
    this.mobile.next(mobile);
  }

  changeuserDetail(userDetail: any) {
    this.userDetail.next(userDetail);
  }

  userDetails(obj) {
    this.userObject.next(obj);
  }

  senduserInfo(param) {
    this.senduserInfoData.next(param);
  }

  showLoading(param: boolean) {
    if (param === true) {
      this.loadSubject.next(true);
    } else {
      this.loadSubject.next(false);
    }
  }
  getSharedDataSample() {
    return this.sampleVar;
  }
  userNameSend(userName) {
    this.userName.next(userName);
  }
  getLoginData(param: Boolean) {
    this.openLogin.next(param);
  }

  getSearchValue(value) {
    this.searchValueData = value;
    this.searchValue.next(value);
  }
  logout(value) {
    this.logoutValue.next(value);
  }
  selectedmenu(value) {
    this.initialmenu = value;
    this.menuvalue.next(value);
  }
  setColor(color) {
    this.colorFilter = color;
  }
  getColor() {
    return this.colorFilter;
  }
  changeshowEmailCaution(showEmailCaution: any) {
    this.showEmailCaution.next(showEmailCaution);
  }
  changeshowCaution(showCaution: any) {
    this.showCaution.next(showCaution);
  }
  changeshowPasswordCaution(showPasswordCaution: any) {
    this.showPasswordCaution.next(showPasswordCaution);
  }
  changesshowMobileCaution(showMobileCaution: any) {
    this.showMobileCaution.next(showMobileCaution);
  }
  changeCurrency(currency: any) {
    sessionStorage.setItem('currencyRate', currency.rate);
    sessionStorage.setItem('currencyCode', currency.code);
    this.currency.next(currency.rate);
  }

  getCurrencyRate() {
    const currencyRate = sessionStorage.getItem('currencyRate');
    if (!currencyRate) {
      this.changeCurrency('1');
    }
    return parseInt(currencyRate, 10);
  }
  getCurrencyCode() {
    const currencyCode = sessionStorage.getItem('currencyCode');
    if (!currencyCode) {
      sessionStorage.setItem('currencyCode', 'INR');
    }
    return sessionStorage.getItem('currencyCode');
  }
}
