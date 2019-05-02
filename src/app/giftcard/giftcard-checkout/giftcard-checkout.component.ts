import { GeneralService } from '../../general.service';
import { SharedService } from '../../shared.service';
import { TransferService } from '../datashare.service';
// import { Giftcard } from '../giftcard.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
// import { GiftcardComponent } from './giftcard.component';
import { Location } from '@angular/common';



@Component({
  selector: 'app-giftcard-checkout',
  templateUrl: './giftcard-checkout.component.html',
  styleUrls: ['./giftcard-checkout.component.css']
})
export class GiftcardCheckoutComponent implements OnInit {

  showpayment = false;
  showOrder = false;
  public paymentpage = false;
  public showPersonalInfo: Boolean = true;
  checkoutLoading = false;
  kntId: any = '';
  locurl: any;
  useridData: string;
  userId: string;
  giftcardresult: Giftcard;
  giftForm: FormGroup;
  isSubmitted = false;
  mainSrc: String = '../../assets/generic_gift.jpg';
  // (click)="mainSrc='../../assets/wedding_kalash.jpg'"
  firstname: string;
  TransferService: any;

 // public carouselItems: Array<any>;

  data: any;
 // public datanew: any = 1;

  constructor(
  private fb: FormBuilder,
    public router: Router,
    private orderview: GeneralService,
    private toastr: ToastsManager,
    private ss: SharedService,
    private route: ActivatedRoute,
    private Transfer:TransferService,
    private location: Location ) { }

  ngOnInit() {

    this.userId = this.orderview.getUserId();

    this.data = this.Transfer.data;
    console.log(this.data);
    this.giftForm = this.fb.group({
      itemAmount: [this.data.itemAmount],
      toemaill: [this.data.toemaill],
      name: [this.data.name],
      message: [this.data.message],
      mobile: [this.data.mobile]
    });

    this.ss.$senduserInfoData.subscribe(res => {
      this.useridData = res;
    });
    this.useridData = this.orderview.getUserId();
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
    });


  }


  giftFormform(giftcardresult: any) {
    //this.isSubmitted = true;
    console.log(giftcardresult);

    this.giftcardresult = giftcardresult;
    this.checkoutLoading = true;
    let reqParam = {};
    console.log(reqParam);
    if (this.kntId === '') {
      reqParam = { userId: this.userId, iteamRequestDTOList: this.giftcardresult };
 //     reqParam = { userId: this.userId, amount: this.itemAmount  };
      console.log(reqParam);
    } else {
        reqParam = { userId: this.userId, iteamRequestDTOList: this.giftcardresult };

    }

    this.orderview.postRequest1('payment', reqParam).subscribe(
      res => {
        if (res.statusCode === 0) {
          this.checkoutLoading = false;
          this.locurl = res.responseContent.headers.Location[0];
          // console.log(this.locurl);
          this.openurl(this.locurl);
        } else {
          this.toastr.error(res.message);
        }
      },
      e => {
        this.checkoutLoading = false;
        this.toastr.error('Error in getting payment gateway. Please try again');
      },
      () => {}
    );

  }


  goBack(giftcardresult: Giftcard){
    console.log(giftcardresult);
    this.Transfer.data=giftcardresult;
  this.router.navigate(['/giftcard']);
  // this.location.back();
 // this.giftcardresult = giftcardresult;
 // console.log(giftcardresult);

  
   }
  


  public openurl(url) {
    window.open(url, '_self');
  }
  

}



export class Giftcard {
  itemAmount: string;
  toemaill: string;
  fromname: string;
  message: string;
  mobile: number;
}