import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap';
import { GeneralService } from '../general.service';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.css']
})
export class TenderComponent implements OnInit {
  locurl: any;
  downloadTenderId: any;
  totalRecords: any;
  pageSize = 5;
  pageNO = 1;
  userId: any;
  tendersId1: any;
  tendersId = false;
  pstyle: any = 'open';
  showImage = false;
  public show = false;

  //  contentArray = new Array(60).fill('');
  returnedArray: string[];

  active = '';
  today = Date.now();
  oneAtATime = true;
  dropdownList = ['All', 'Active', 'Applied', 'Won'];
  public tender: any;

  public startItem;
  public endItem;

  tenderFilter = 'All';
  selectedData;

  constructor(
    private wishservice: GeneralService,
    private ss: SharedService,
    public router: Router
  ) {}

  ngOnInit() {
    this.goTender();
    //  this.contentArray = this.contentArray.map((v: string, i: number) => `Content line ${i + 1}`);
    // this.returnedArray = this.contentArray.slice(0, 1);
    this.getTenders();
    this.userId = this.wishservice.getUserId();
  }

  toggle() {
    this.show = !this.show;
  }

  pageChanged(event: PageChangedEvent): void {
    this.pageNO = event.page;
    this.pageSize = event.itemsPerPage;
    this.getTenders();
  }

  public showTender(value) {
    this.pstyle = value;
    this.getTenders();
  }
  onDropdownChange(country) {
    this.tenderFilter = country;

    this.selectedData = this.tender.filter(x => x.Tenderstatus === country);
    if (country === 'All') {
      this.selectedData = this.tender;
    }
  }

  getTenders() {
    const reqParam = this.wishservice.getUserId();
    //  let reqParam = 543;
    this.ss.showLoading(true);
    this.wishservice
      .getRequest(
        'tender?id=' +
          reqParam +
          '&page=' +
          this.pageNO +
          '&size=' +
          this.pageSize +
          '&status=' +
          this.pstyle
      )
      .subscribe(
        res => {
          //  this.wishlist=res.responseContents;
          this.tender = res.responseContent;
          this.selectedData = this.tender;
          this.ss.showLoading(false);
          //   this.returnedArray = this.tender.slice(0, 5);

          this.totalRecords = res.totalRecords;
        },
        e => {
          this.ss.showLoading(false);
        },
        () => {
          /*alert('login successfull');*/
        }
      );
  }

  downloadDocument(val) {
    this.downloadTenderId = val;
    this.getDownloadDocument();
  }

  public tenderPayment(typeOfPayment, id) {
    const reqParam = {
      userId: this.wishservice.getUserId(),
      typeOfPayment: typeOfPayment,
      tenderId: id
    };
    this.ss.showLoading(true);
    this.wishservice.postRequest1('payment/tender', reqParam).subscribe(
      res => {
        this.ss.showLoading(false);
        this.locurl = res.responseContent.headers.Location[0];
        this.openurl(this.locurl);
      },
      e => {
        this.ss.showLoading(false);
      },
      () => {
        /*alert('login successfull');*/
      }
    );
  }

  public openurl(url) {
    window.open(url, '_self');
  }

  getDownloadDocument() {
    //  let reqParam=1;
    const reqParam = this.wishservice.getUserId();
    window.open(
      this.wishservice.newBaseUrl +
        'tender/download?userId=' +
        reqParam +
        '&tenderId=' +
        this.downloadTenderId
    );
    //  let reqParam=  this.wishservice.getUserId();
  }

  onClick(val, val1) {
    if (val1 !== this.tendersId1) {
      this.tendersId1 = val1;
    } else {
      this.tendersId1 = '';
    }
    //  this.tendersId = !this.tendersId;
    //  if(val1){
    //    this.showImage = val1;
    //  }
    //  if( ((document.getElementById("act").style.display == "" || document.getElementById("act").style.display == "block"))){
    //    document.getElementById("act").style.display = "none";
    //    document.getElementById("act1").style.display = "block";
    //   //  document.getElementById("colr").style.borderLeftColor = '#1c9cea';
    //  }
    //   else{
    //     document.getElementById("act1").style.display = "none";
    //    document.getElementById("act").style.display = "block";
    //     // document.getElementById("colr").style.borderLeftColor = '#bdbdbd';
    //   }
  }
  goTender() {
if (this.wishservice.getUserId() !== undefined) {
      const reqParam = this.wishservice.getUserId();
      this.wishservice
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
          () => {
            /*alert('login successfull');*/
          }
        );
    } else {
      this.router.navigate(['tender/login']);
    }
  }
}
