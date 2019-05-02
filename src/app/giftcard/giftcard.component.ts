import {GeneralService} from '../general.service';
import { SharedService } from '../shared.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';

import {TransferService} from './datashare.service'
// import * as moment from 'moment';

@Component({
  selector: 'app-giftcard',
  templateUrl: './giftcard.component.html',
  styleUrls: ['./giftcard.component.css']
})
export class GiftcardComponent implements OnInit {
  giftForm: FormGroup;
  public emailPattern = '[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  // toemaill: any = '';
  name1: any = '';
 // name1: false;
  DD: any = '';
  // public maxDate: Date;
  checkoutLoading = false;
  kntId: any = '';
  userId: string;
  userDetails: any;
  user: any;
  public deliveryplace: any;
  totalAmout1: number;
  cartList1: any = [];
 // giftcardresult: any = [Giftcard];
  firstname: any;
  locurl: any;
  messageval: string;
  amountval: number;
  other_amount: string;
  isSubmitted = false;
  giftcardresult: Giftcard;
  public paymentpage = false;
  showpayment = false;
  public showPersonalInfo: Boolean = true;
  showOrder = false;
  totalAmout: number;
  kntSchemeList: any = [];
  cartList: any;
  discountValue: number;
  mainSrc: String = '../../assets/generic_gift.jpg';
  public data: any = 1;
    id: any;
    productID: string;
  // cartList1: any = [];

  public address: any;
  public billingAddress: any;
  public shippingAddress: any;
  public officeAddress: any;
  public customerAddress: any;
  public recentShippingAddressMaster: any ;

  deliverydate: any;
  useridData: string;


  constructor(
    private fb: FormBuilder,
    public router: Router,
    private orderview: GeneralService,
    private toastr: ToastsManager,
    private ss: SharedService,
    private route: ActivatedRoute,
    private TransferService: TransferService,
    private generalService: GeneralService, ) { }

//  submit(value) {
//    this.giftForm.controls['name'].markAsTouched();
//    this.giftForm.controls['email'].markAsTouched();
//  }




  ngOnInit() {

 //   this.kntschemeList();
// this.productID = this.orderview.getUserId();

    // this.orderview.getRequest("giftcard").subscribe(
    //   res => {
    //   this.productID = res.responseContents;
    // },
    // e => {},
    // () => {}
    // );
   // console.log(this.productID);

    this.giftForm = this.fb.group({
    toemaill: ['', [Validators.required]],
    itemAmount: ['', [Validators.required]],
    message: ['', [Validators.required]],
    name: ['',[Validators.required]],
    mobile: ['', [Validators.required]],
    });

    this.ss.$senduserInfoData.subscribe(res => {
      this.useridData = res;
    });
    this.useridData = this.orderview.getUserId();
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
    });
    
 this.firstname = localStorage.getItem('co-optex-userName');


  }

    
  
  
  public getUserInfo() {
    const reqParam = {
      id: this.userId
    };

    this.generalService.postRequest1('userPersonalInfo', reqParam).subscribe(
      res => {
        this.ss.changepersonalInfo(res.responseContent);
        localStorage.setItem('firstname', res.responseContent.name);
      },
      e => {},
      () => {}
    );
  }



//  public getAddress() {
//     this.userId = this.orderview.getUserId();
//    this.ss.showLoading(true);
//    this.orderview
//      .getRequest('getUserManageAddress?id=' + this.userId)
//      .subscribe(
//        res => {
//          this.address = [];
//          this.ss.showLoading(false);
//          this.customerAddress = res.responseContent.customerAddressMaster;
//          console.log(this.customerAddress);
//          const addressId = [];
//          if (this.customerAddress.id != null) {
//            this.customerAddress.type = 'home';
//            this.address.push(this.customerAddress);
//            addressId.push(this.customerAddress.id);
//          }
//          // this.GetDeliveryAddress(this.address1[0]);
//        },
//        e => {
//          this.ss.showLoading(true);
//        },
//        () => {}
//      );
//
//
//  }




  get toemaill() {return this.giftForm.get('toemaill'); }
  get itemAmount() {return this.giftForm.get('itemAmount'); }
  get name() {return this.giftForm.get('name'); }
  get message() {return this.giftForm.get('message'); }
   get mobile() { return this.giftForm.get('mobile'); }


   

//  getprice(name) {
//    console.log(name.value);
//  }


  giftFormform(giftcardresult: Giftcard) {
    this.isSubmitted = true;
    console.log(giftcardresult);

    this.giftcardresult = giftcardresult;
    if (this.giftForm.invalid) {
      return;
        } 
    else
      {
      this.TransferService.data= this.giftcardresult;
       console.log( this.TransferService.data);
     this.router.navigate(['/giftcard/giftcard-checkout']);
    }
    // else {  this.getAddress();}
  }

  public openurl(url) {
    window.open(url, '_self');
  }

  GetDeliveryAddress(delivery) {
    this.deliveryplace = delivery;
    this.data = delivery.id;
    this.id = delivery.id;
  }


}






export class Giftcard {
  itemAmount: string;
  toemaill: string;
  fromname: string;
  message: string;
  mobile: number;
}