import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from '../../general.service';
import { SharedService } from '../../shared.service';
import { ToastsManager } from 'ng2-toastr';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
@Component({
  selector: 'app-made-order',
  templateUrl: './made-order.component.html',
  styleUrls: ['./made-order.component.css']
})
export class MadeOrderComponent implements OnInit {
  @ViewChild('madeToOderForm') madeToOderForm: NgForm;
  descriptionerror = false;
  umoerror = false;
  fileerror = [false, false, false, false];
  showError = false;
  showError1 = false;
  testObject: any = {};
  showUrl: any = [];
  url1: any = [];
  url: any = [];
  disableButton = false;
  showForm = false;
  fileDisable = true;
  Umo: any;
  orderList: any = [];
  showMadeToError = false;
  constructor(
    private generalService: GeneralService,
    private ss: SharedService,
    private toastr: ToastsManager
  ) {}
  public items: Array<string> = ['All', 'This Week', 'Last month', ''];

  umo: any = -1;
  length: any = '';
  description: any = '';
  quantity: any = '';
  ele: any;

  ngOnInit() {
    this.getMakeToOrderList();
    this.getumoList();
  }

  public showform() {
    this.showForm = true;
  }

  public showform1() {
    this.showForm = false;
  }

  public umoChange(event) {
    this.umo = event;
  }

  public inputChange1(event) {
    if (event === '' || event == null) {
      this.showError = false;
    } else {
      if (event <= 0) {
        this.showError = true;
      } else {
        this.showError = false;
      }
    }
  }

  public inputChange(event) {
    if (event === '' || event == null) {
      this.showError1 = false;
    } else {
      if (event <= 0) {
        this.showError1 = true;
      } else {
        this.showError1 = false;
      }
    }
  }

  public makeAnOrder() {
    this.showMadeToError = false;

    if (
      this.fileerror.indexOf(true) !== -1 ||
      this.umo === -1 ||
      this.quantity === '' ||
      this.description === ''
    ) {
      this.showMadeToError = true;
      return;
    }

    // if (
    //   this.url.length === 0 ||
    //   this.length === '' ||
    //   this.umo === -1 ||
    //   this.quantity === '' ||
    //   this.description === ''
    // ) {
    // this.disableButton = true;
    // } else {
    this.ss.showLoading(true);
    // if(this.url==[] || this.length=='' || this.umo=='' || this.quantity=='' || this.description==''){
    //   this.
    // }
    const formData: any = new FormData();
    const files: Array<File> = this.url;
    const filename = [];
    const imageType = ['body', 'border', 'zari', 'pallu'];
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i], files[i]['name']);
      filename.push(files[i]['name']);
    }

    const orderDetails = {
      uomMasterId: Number(this.umo),
      productQuantity: Number(this.quantity),
      description: this.description,
      length: Number(this.length),
      filenames: filename,
      imageType: imageType,
      userId: Number(this.generalService.getUserId())
    };
    formData.append('orderDetails', JSON.stringify(orderDetails));

    this.generalService.postRequest2('addMadeToOrder', formData).subscribe(
      res => {
        this.ss.showLoading(false);
        this.getMakeToOrderList();
        this.showForm = false;
        this.umo = -1;
        this.quantity = '';
        this.description = '';
        this.length = '';
        this.url1 = [];
        this.url = [];
        this.disableButton = false;
        this.toastr.success(res.message);
      },
      e => {
        this.ss.showLoading(false);
        this.toastr.error('Something went wrong.Please try again');
      },
      () => {}
    );
    // }
  }

  public getMakeToOrderList() {
    this.showUrl = [];
    this.ss.showLoading(true);
    const reqParam = this.generalService.getUserId();
    this.generalService
      .getRequest('getMadeToOrderDetails?id=' + reqParam)
      .subscribe(
        res => {
          this.ss.showLoading(false);
          this.orderList = res.responseContent;

          for (let i = 0; i < this.orderList.length; i++) {
            const myArray = [];
            for (
              let j = 0;
              j < this.orderList[i].salesOrderItemsList.length;
              j++
            ) {
              myArray.push(this.orderList[i].salesOrderItemsList[j].filePath);
              this.testObject['show_' + i] = myArray;
              // this.orderList[i]['file'].push(myArray);
            }
          }
        },
        e => {
          this.ss.showLoading(false);
        },
        () => {}
      );
  }

  public downloadFile(id) {
    const reqParam = id;
    window.open(
      this.generalService.newBaseUrl +
        'madeToOrder/download?salesOrderItemId=' +
        reqParam
    );
  }

  public getumoList() {
    this.generalService.getRequest('getUom').subscribe(
      res => {
        this.Umo = res.responseContent;
      },
      e => {},
      () => {}
    );
  }

  public removeImg() {}

  readUrl(event: any, index) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event1: any) => {
        const d = event1.target.result;
        this.url1[index] = event1.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    this.url[index] = event.target.files[0];

    if (this.url[index] === undefined) {
      this.fileerror[index] = true;
    } else {
      this.fileerror[index] = false;
    }
  }

  public srcClick(index) {
    this.url1[index] = undefined;
    this.url[index] = undefined;
    if (this.url[index] === undefined) {
      this.fileerror[index] = true;
    } else {
      this.fileerror[index] = false;
    }
  }
}
