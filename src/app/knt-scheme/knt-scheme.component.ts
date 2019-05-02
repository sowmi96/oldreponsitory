import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Optional,
  OnDestroy,
  ElementRef
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from '../general.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { ToastsManager } from 'ng2-toastr';
import { NgxCarousel } from 'ngx-carousel';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-knt-scheme',
  templateUrl: './knt-scheme.component.html',
  styleUrls: ['./knt-scheme.component.css'],
  providers: [BsModalService, NgxCarousel]
})
export class KntSchemeComponent implements OnInit, OnDestroy {
  location: any;
  @ViewChild('openBtn') public openBtn: ElementRef;
  public remainingMonths = [];
  paymentSuccess: boolean;
  public montherror: Boolean = false;
  public selectmonth: any = null;
  disablePayment1 = false;
  bonusMonth: number;
  showerrorMsg2 = false;
  showerrorMsg1 = false;
  showerrorMsg = false;
  disablePayment: boolean;
  locurl: any;
  checkme: any;
  public Plandata = true;
  public carouselTile: NgxCarousel;
  public maturityDate: any;
  public currentDate = false;
  public matureshow: any;

  @ViewChild('Schemeform') scheme: any;
  public userdata: any;
  public paymentDetail: any;
  public shouldShow: any;
  public showcomplete: any;
  public childShow: any;
  public minval: any;
  public closedshow = false;
  public maxval: any;
  public noschemeRunning;
  public nocompleted;
  public DeleteSchema: any;
  public Running: any;
  public schemecomplete: any;
  public cancelled: any;
  public Plans = null;
  public condition: Boolean = false;
  public changestep = true;
  public payment: any = [];
  public Nominee: any = {};
  public KntPlans: any = [];
  public postscheme: any;
  public schemeset: any;
  public FixAmount = 100;
  public paymentshow: any = false;
  toggleArrow = false;
  public unpaidsettle = false;
  public Totalamount = 0;
  bonusAmount = 0;
  modalRef: BsModalRef;
  public installmonth: number;
  oneAtATime = true;
  public user;
  public paymentdata: any;
  public Schemeshow = false;
  public checkpage: any;
  subscription: Subscription;

  constructor(
    private router: Router,
    private shared: SharedService,
    private http: HttpClient,
    private Kntschema: GeneralService,
    private modalService: BsModalService,
    private toastr: ToastsManager
  ) {}

  ngOnInit() {
    this.user = this.Kntschema.getUserId();
    this.userdata = this.Kntschema.getUserId();
    this.checkpage = localStorage.getItem('schemeaccess');
    this.carouselTile = {
      grid: { xs: 1, sm: 3, md: 3, lg: 3, all: 0 },
      slide: 1,
      point: {
        visible: false
      },
      load: 2,
      touch: true,
      easing: 'ease'
    };
    this.subscription = this.shared.KntschemePresent$.subscribe(schemeset => {
      this.checkme = schemeset;
      if (this.checkme === 1 || this.checkpage === 1) {
        this.router.navigate(['/knt_scheme']);
      } else {
        this.router.navigate(['/knt_scheme']);
      }
    });

    this.listAllscheme();
  }

  public monthselection(templatepayment: TemplateRef<any>, selection) {
    this.remainingMonths = [];
    this.paymentdata = selection;
    const finalmonth = selection.remainingMonths;
    for (let i = 1; i <= finalmonth; i++) {
      this.remainingMonths.push(i);
    }
    this.modalRef = this.modalService.show(templatepayment);
  }
  public kntPayment(x) {
    if (this.selectmonth !== null) {
      this.shared.showLoading(true);

      const reqParam = {
        id: x.id,
        userId: this.Kntschema.getUserId(),
        amount: x.installmentAmount,
        installmentMonths: this.selectmonth
      };
      this.Kntschema.postRequest1('kntSchemePayment', reqParam).subscribe(
        res => {
          this.shared.showLoading(false);
          this.modalRef.hide();

          this.locurl = res.responseContent.headers.Location[0];
          this.openurl(this.locurl);
        },
        e => {
          this.shared.showLoading(false);
        },
        () => {}
      );
    } else {
      this.montherror = true;
    }
  }

  public openurl(url) {
    window.open(url, '_self');
  }

  listAllscheme() {
    this.shared.showLoading(true);

    const running = {
      userId: this.userdata,
      tabValue: 'running'
    };
    this.nocompleted = false;
    this.Kntschema.postRequest1('listAllScheme', running).subscribe(
      res => {
        this.shared.showLoading(false);

        this.Running = res.responseContents;
        if (this.Running == null) {
          this.noschemeRunning = true;
        } else {
          this.noschemeRunning = false;
        }
      },
      e => {
        this.toastr.error('Error in Getting Knt Schmes,Please try Again ');
        this.shared.showLoading(false);
      }
    );
  }

  completed() {
    this.shared.showLoading(true);

    const closed = {
      userId: this.userdata,
      tabValue: 'closed'
    };

    this.noschemeRunning = false;

    this.Kntschema.postRequest1('listAllScheme', closed).subscribe(
      res => {
        this.shared.showLoading(false);

        this.schemecomplete = res.responseContents;

        if (this.schemecomplete == null) {
          this.nocompleted = true;
        } else {
          this.nocompleted = false;
        }
      },
      e => {
        this.shared.showLoading(false);
      },
      () => {}
    );
  }

  // CancelledScheme(){

  // }

  toggle(set, pay, amount) {
    if (pay === false) {
      this.disablePayment = true;
    } else {
      this.disablePayment = false;
    }
    if (amount === 0) {
      this.disablePayment1 = true;
    } else {
      this.disablePayment1 = false;
    }
    this.payment = [];
    this.Kntschema.getRequest1('kntSchemePaymentDetails?id=' + set).subscribe(
      res => {
        this.paymentDetail = res.responseContents;
        if (this.paymentDetail == null) {
          this.paymentshow = false;
        } else {
          this.paymentshow = true;
        }
      }
    );
    if (this.shouldShow === set) {
      this.shouldShow = '';
    } else {
      this.shouldShow = set;
    }
    this.changestep = !this.changestep;
    // this.toggleArrow = !this.toggleArrow;
  }
  toggleschema(complete) {
    this.Kntschema.getRequest1(
      'kntSchemePaymentDetails?id=' + complete
    ).subscribe(res => {
      this.paymentDetail = res.responseContents;
      if (this.paymentDetail == null) {
        this.closedshow = false;
      } else {
        this.closedshow = true;
      }
    });
    if (this.showcomplete === complete) {
      this.showcomplete = '';
    } else {
      this.showcomplete = complete;
    }
    this.changestep = !this.changestep;
    // this.toggleArrow = !this.toggleArrow;
  }
  emptyform() {
    this.Schemeshow = false;
    this.scheme.reset();
  }
  Schemesave(x) {
    this.shared.showLoading(true);

    this.postscheme = x;
    this.schemeset = {
      userId: this.userdata,
      kntPlanMasterId: this.postscheme.kntPlanMasterId,
      totalInstallmentAmount: this.postscheme.totalInstallmentAmount,
      installmentAmount: this.postscheme.installmentAmount,
      nomineeId: this.Nominee.id,
      bonusAmount: this.bonusAmount
    };

    this.Kntschema.postRequest1('addKntScheme', this.schemeset).subscribe(
      res => {
        if (res.statusCode === 0) {
          this.scheme.reset();
          this.openBtn.nativeElement.click();
          this.location = res.responseContent.headers.Location[0];
        } else {
          this.toastr.error(res.message);
        }
        this.shared.showLoading(false);
      },
      e => {
        this.toastr.error('Error in Adding Schemes,Please try Again ');
        this.shared.showLoading(false);
      }
    );
  }
  public doPayment(value) {
    this.paymentSuccess = value;
    this.modalRef.hide();
    if (this.paymentSuccess === true) {
      window.location.href = this.location;
    }
    this.Schemeshow = false;
    this.listAllscheme();
  }
  openModal(template: TemplateRef<any>, x) {
    this.modalRef = this.modalService.show(template);
    this.DeleteSchema = x;
  }

  openModal1(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  DeleteInitiate(id) {
    const cancel = {
      userId: this.userdata,
      kntRegistrationId: id
    };
    this.Kntschema.postRequest1('cancelKntScheme', cancel).subscribe(
      res => {
        this.completed();
        this.listAllscheme();
      },
      e => {},
      () => {}
    );

    this.modalRef.hide();
  }

  ShowChild(itemid, pay, amount) {
    if (amount === 0 || pay === false) {
      this.disablePayment = true;
    } else if (amount === 0 && pay === false) {
      this.disablePayment = true;
    } else {
      this.disablePayment = false;
    }
    if (this.childShow === itemid) {
      this.childShow = '';
    } else {
      this.childShow = itemid;
    }
  }
  Conditionscheck() {
    this.condition = !this.condition;
  }
  hide() {
    this.condition = false;

    this.modalRef.hide();
  }

  hidetemplate() {
    this.modalRef.hide();
    this.selectmonth = null;
  }
  DoPayment(payfor) {
    if (this.payment.indexOf(payfor) < 0) {
      this.payment.push(payfor);
    } else {
      const min = this.payment.indexOf(payfor);
      this.payment.splice(min, 1);
    }
  }

  showScheme() {
    this.condition = false;
    this.Schemeshow = true;
    this.Kntschema.getRequest(
      'getNomineeDetails?id=' + this.userdata
    ).subscribe(
      res => {
        this.Nominee = res.responseContent;
      },
      e => {},
      () => {}
    );

    this.Kntschema.getRequest('listAllKntPlan').subscribe(
      res => {
        this.KntPlans = res.responseContents;
      },
      e => {},
      () => {}
    );
  }

  search(searchfield, myArray) {
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].id === searchfield) {
        return myArray[i];
      }
    }
  }

  isSpecial(e) {
    if (
      !(
        (e.keyCode > 95 && e.keyCode < 106) ||
        (e.keyCode > 47 && e.keyCode < 58) ||
        e.keyCode === 8
      )
    ) {
      return false;
    }
  }
  PlanChanged(kntid) {
    const knt = parseInt(kntid, 10);
    const x = this.search(knt, this.KntPlans);
    this.matureshow = true;
    this.FixAmount = x.min_amount;
    this.Plandata = false;
    this.minval = x.min_amount;
    this.maxval = x.max_amount;
    this.bonusMonth = x.bonus_month;
    this.installmonth = x.installment_month;
    const months = x.installment_month;
    const currentDate = moment();
    let futureMonth = moment(currentDate).add(months, 'M');
    const futureMonthEnd = moment(futureMonth).endOf('month');

    if (
      currentDate.date() !== futureMonth.date() &&
      futureMonth.isSame(futureMonthEnd.format('YYYY-MM-DD'))
    ) {
      futureMonth = futureMonth.add(1, 'd');
    }

    this.maturityDate = moment(futureMonth).format('DD-MM-YYYY');
    this.Totalamountpayable();
  }

  AmountChange(amount, event) {
    let remainder;
    if (event != null) {
      remainder = event % 100;
    } else {
      event = 0;
      remainder = event % 100;
    }
    if (event < this.minval) {
      this.showerrorMsg = true;
      this.showerrorMsg1 = false;
      this.showerrorMsg2 = false;
      // setTimeout(() => {
      //   this.FixAmount = this.minval;
      // }, 0);
      // return;
    } else if (event > this.maxval) {
      this.showerrorMsg1 = true;
      this.showerrorMsg = false;
      this.showerrorMsg2 = false;
      // setTimeout(() => {
      //   this.FixAmount = this.maxval;
      // }, 0);

      // return;
    } else if (remainder !== 0) {
      this.showerrorMsg2 = true;
      this.showerrorMsg1 = false;
      this.showerrorMsg = false;
    } else if (event >= this.minval || event <= this.maxval) {
      this.showerrorMsg2 = false;
      this.showerrorMsg1 = false;
      this.showerrorMsg = false;
    } else {
      this.showerrorMsg2 = false;
      this.showerrorMsg1 = false;
      this.showerrorMsg = false;
    }
    this.FixAmount = event;
    // } else {
    //   event=0;
    //   const remainder = event % 100;
    //   if (event < this.minval) {
    //     this.showerrorMsg = true;
    //     this.showerrorMsg1 = false;
    //     this.showerrorMsg2 = false;
    //     // setTimeout(() => {
    //     //   this.FixAmount = this.minval;
    //     // }, 0);
    //     // return;
    //   } else if (amount > this.maxval) {
    //     this.showerrorMsg1 = true;
    //     this.showerrorMsg = false;
    //     this.showerrorMsg2 = false;
    //     // setTimeout(() => {
    //     //   this.FixAmount = this.maxval;
    //     // }, 0);
    //     // return;
    //   } else if (remainder !== 0) {
    //     this.showerrorMsg2 = true;
    //     this.showerrorMsg1 = false;
    //     this.showerrorMsg = false;
    //   } else if (amount >= this.minval || amount <= this.maxval) {
    //     this.showerrorMsg2 = false;
    //     this.showerrorMsg1 = false;
    //     this.showerrorMsg = false;
    //   } else {
    //     this.showerrorMsg2 = false;
    //     this.showerrorMsg1 = false;
    //     this.showerrorMsg = false;
    //   }
    //   this.FixAmount = amount;
    // }
    this.Totalamountpayable();
  }
  Totalamountpayable() {
    this.Totalamount = this.installmonth * this.FixAmount;
    this.bonusAmount = this.bonusMonth * this.FixAmount;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
