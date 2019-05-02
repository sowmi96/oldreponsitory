import { Component, OnInit, ElementRef } from "@angular/core";
import { GeneralService } from "../../general.service";
import { all } from "q";
import { ViewChild } from "@angular/core";
import { isGeneratedFile } from "@angular/compiler/src/aot/util";
import { TemplateRef } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SharedService } from '../../shared.service';
import { ToastsManager } from 'ng2-toastr';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [BsModalService]
})
export class CheckoutComponent implements OnInit {
  totalAmout1: number;
  check1: any;
  kntId: any = '';
  check = false;
  kntSchemeList: any = [];
  disableState = false;
  disableDistrict = false;
  disableCity = false;
  cityId: any;
  districtId: any;
  stateId: any;
  countryId: any;
  stateList: any = [];
  cityList: any = [];
  districtList: any = [];
  cartList1: any = [];
  discountValue: number;
  userId: string;
  cartList: any;
  totalAmout: number;
  id: any;
  address1: any = [];
  countryList: any;
  customerAddress: any;
  officeAddress: any;
  shippingAddress: any;
  billingAddress: any;
  recentShippingAddressMaster;
  addressSaveLoad = false;
  addressError = '';
  locurl: any;
  @ViewChild('closeButton1') closeBtn1: ElementRef;
  @ViewChild('Addressform') form: any;
  modalRef: BsModalRef;

  public data: any = 1;
  showOrder = false;
  public addtitle: any;
  public showPersonalInfo: Boolean = true;
  public address: any;
  public deliveryplace: any;
  public orderitem: any;
  public ordertotal: any;
  public orderpage = false;
  public infopage = true;
  public paymentpage = false;
  public shipping: any = [{}];
  showpayment = false;
  toggle = [false, false, false, false];
  checkoutLoading = false;
  kntAmount = 0;
  typeaddress = 1;
  constructor(
    private ss: SharedService,
    private orderview: GeneralService,
    private modalService: BsModalService,
    private toastr: ToastsManager
  ) {}

  ngOnInit() {
    this.userId = this.orderview.getUserId();
    this.kntschemeList();
    this.getAddress();
    this.getCountry();
    this.getCartdetails1();
    this.modalService.onHide.subscribe((reason: string) => {
      this.shipping.Name = '';
      this.shipping.last = '';
      this.shipping.Mobno = '';
      this.shipping.Pincode = '';
      this.shipping.Address = '';
      this.shipping.Adressstwo = '';
      this.shipping.Adressstwo = '';
      this.shipping.City = '';
      this.shipping.State = '';
      this.shipping.Country = '';
    });
  }
  toggleIcon(arg) {
    this.toggle[arg] = !this.toggle[arg];
  }

  // checkboxchange(event){
  //   if(event==true){
  //     this.kntschemeList()
  //   }
  // }
  isNumber(evt) {
    evt = evt ? evt : window.event;
    const charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  checkboxchange1(event, id, amount) {
    if (event === true) {
      this.kntId = id;
      if (this.totalAmout - amount >= 0) {
        this.totalAmout1 = this.totalAmout - amount;
        this.kntAmount = amount;
      } else {
        this.toastr.error('Order amount should be grater than plan amount');
      }
    }
  }

  public kntschemeList() {
    const reqParam = {
      userId: this.userId,
      tabValue: 'running'
    };

    this.orderview.postRequest1('listAllScheme', reqParam).subscribe(
      res => {
        if (res.responseContents !== null) {
          for (let i = 0; i < res.responseContents.length; i++) {
            if (
              this.totalAmout >= res.responseContents[i].totalAmountPaid &&
              res.responseContents[i].totalAmountPaid !== 0
            ) {
              this.kntSchemeList.push(res.responseContents[i]);
            }
          }
        }
      },
      e => {},
      () => {}
    );
  }

  public checkout() {
    this.checkoutLoading = true;
    let reqParam = {};
    if (this.kntId === '') {
      reqParam = {
        userId: this.userId,
        deliveryAddress:
          this.deliveryplace.addressLine1 +
          ',' +
          this.address1.primaryContactNumber +
          ',' +
          this.deliveryplace.stateName +
          ',' +
          this.deliveryplace.countryName +
          ',' +
          this.deliveryplace.pincode,
        amount: this.totalAmout1,
        iteamRequestDTOList: this.cartList1
      };
    } else {
      reqParam = {
        userId: this.userId,
        deliveryAddress:
          this.deliveryplace.addressLine1 +
          ',' +
          this.address1.primaryContactNumber +
          ',' +
          this.deliveryplace.stateName +
          ',' +
          this.deliveryplace.countryName +
          ',' +
          this.deliveryplace.pincode,
        amount: this.totalAmout1,
        kntId: this.kntId,
        iteamRequestDTOList: this.cartList1
      };
    }

    this.orderview.postRequest1('payment', reqParam).subscribe(
      res => {
        if (res.statusCode === 0) {
          this.checkoutLoading = false;
          this.locurl = res.responseContent.headers.Location[0];
          this.openurl(this.locurl);
        } else {
          this.toastr.error(res.message);
        }
      },
      e => {
        this.checkoutLoading = false;
        this.toastr.error('Error in getting payment gateway.Please try again');
      },
      () => {}
    );
  }

  public openurl(url) {
    window.open(url, '_self');
  }

  public getAddress() {
    this.ss.showLoading(true);
    this.orderview
      .getRequest('getUserManageAddress?id=' + this.userId)
      .subscribe(
        res => {
          this.address1 = [];
          this.ss.showLoading(false);
          this.billingAddress = res.responseContent.billingAddressMaster;
          this.shippingAddress = res.responseContent.shippingAddressMaster;
          this.officeAddress = res.responseContent.officeAddressMaster;
          this.customerAddress = res.responseContent.customerAddressMaster;
          this.recentShippingAddressMaster =
            res.responseContent.recentShippingAddressMaster;
          const addressId = [];
          if (this.shippingAddress.id != null) {
            this.shippingAddress.type = 'shipping';
            this.address1.push(this.shippingAddress);
            addressId.push(this.shippingAddress.id);
          }
          if (this.customerAddress.id != null) {
            this.customerAddress.type = 'home';
            this.address1.push(this.customerAddress);
            addressId.push(this.customerAddress.id);
          }
          if (this.officeAddress.id != null) {
            this.officeAddress.type = 'office';
            this.address1.push(this.officeAddress);
            addressId.push(this.officeAddress.id);
          }
          if (this.billingAddress.id != null) {
            this.billingAddress.type = 'billing';
            this.address1.push(this.billingAddress);
            addressId.push(this.billingAddress.id);
          }
          if (
            this.recentShippingAddressMaster &&
            this.recentShippingAddressMaster.id != null &&
            addressId.indexOf(this.recentShippingAddressMaster.id) === -1
          ) {
            this.address1.unshift(this.recentShippingAddressMaster);
          }
          this.GetDeliveryAddress(this.address1[0]);
        },
        e => {
          this.ss.showLoading(true);
        },
        () => {}
      );
  }

  public getCountry() {
    this.orderview.getRequest('getAllCountryList').subscribe(
      res => {
        this.countryList = res.responseContents;
      },
      e => {},
      () => {}
    );
  }
  CountryChange(event) {
    this.countryId = event;
    this.orderview.getRequest('getStateListByCountry/' + event).subscribe(
      res => {
        this.stateList = res.responseContents;
        this.disableState = true;
      },
      e => {},
      () => {}
    );
  }

  public Formsave(value) {
    this.addressSaveLoad = true;
    this.addressError = '';
    if (value.addresstype !== 0) {
      const data = {
        userId: this.userId,
        addressId: value.addresstype,
        addressLine1: value.Address,
        addressLine2: value.place2,
        countryID: value.Country,
        stateId: value.state,
        districtID: value.district,
        cityId: value.city,
        pincode: value.Pincode
      };
      this.orderview.postRequest1('postUserManageAddress', data).subscribe(
        res => {
          this.addressSaveLoad = false;
          this.modalRef.hide();
          this.getAddress();
          // this.address1.unshift({
          //   id: res.responseContent.id,
          //   addressLine1: res.responseContent.addressLineOne,
          //   addressLine2: res.responseContent.addressLineTwo,
          //   countryName: res.responseContent.countryMaster.name,
          //   stateName: res.responseContent.stateMaster.name,
          //   districtName: res.responseContent.districtMaster.name,
          //   cityName: res.responseContent.cityMaster.name,
          //   pincode: res.responseContent.postalCode,
          //   type: value.addresstype
          // });
          this.GetDeliveryAddress(this.address1[0]);
        },
        e => {
          this.addressSaveLoad = false;
          this.addressError = 'Error in adding address.Please try agian';
        },
        () => {}
      );
    } else {
      const reqParm = {
        userId: this.userId,
        addressId: 0,
        addressLine1: value.Address,
        addressLine2: value.place2,
        countryID: this.countryId,
        stateId: this.stateId,
        districtID: this.districtId,
        cityId: this.cityId,
        pincode: value.Pincode
      };
      this.orderview.postRequest1('addNewUserManageAddres', reqParm).subscribe(
        res => {
          this.addressSaveLoad = false;

          this.modalRef.hide();
          this.address1.unshift({
            id: res.responseContent.id,
            addressLine1: res.responseContent.addressLineOne,
            addressLine2: res.responseContent.addressLineTwo,
            countryName: res.responseContent.countryMaster.name,
            stateName: res.responseContent.stateMaster.name,
            districtName: res.responseContent.districtMaster.name,
            cityName: res.responseContent.cityMaster.name,
            pincode: res.responseContent.postalCode,
            type: 'new'
          });
          this.GetDeliveryAddress(this.address1[0]);
        },
        e => {
          this.addressSaveLoad = false;
          this.addressError = 'Error in adding address.Please try agian';
        },
        () => {}
      );
    }
  }

  StateChange(event) {
    this.stateId = event;
    this.orderview.getRequest('getDistrictListByState/' + event).subscribe(
      res => {
        this.districtList = res.responseContents;
        this.disableDistrict = true;
      },
      e => {},
      () => {}
    );
  }

  districtChange(event) {
    this.districtId = event;
    this.orderview.getRequest('getCityListByDistrict/' + event).subscribe(
      res => {
        this.cityList = res.responseContents;
        this.disableCity = true;
      },
      e => {},
      () => {}
    );
  }

  cityChange(event) {
    this.cityId = event;
  }

  public getCartdetails1() {
    this.totalAmout = 0;
    const reqParam = this.orderview.getUserId();
    this.orderview.getRequest('cartDetails?id=' + reqParam).subscribe(
      res => {
        this.cartList = res.responseContent;
        for (let i = 0; i < this.cartList.length; i++) {
          this.totalAmout = this.totalAmout + this.cartList[i].totalAmount;
          this.discountValue =
            this.cartList[i].actualPrice - this.cartList[i].newPrice;
          this.cartList1.push({
            productId: this.cartList[i].productId,
            productConfigId: this.cartList[i].productConfigId,
            itemQty: this.cartList[i].quantity,
            itemAmount: this.cartList[i].newPrice,
            discountPercent: this.cartList[i].discountPercentage,
            discountValue: this.discountValue,
            taxPercent: this.cartList[i].taxPercentage,
            taxValue: this.cartList[i].taxAmount
          });
        }
        this.totalAmout1 = this.totalAmout;
        this.kntschemeList();
      },
      e => {},
      () => {}
    );
  }

  showdataView(data) {
    if (data === 'order') {
      if (this.orderpage === true) {
        this.showpayment = false;
        this.showPersonalInfo = false;
        this.showOrder = true;
      }
    }

    if (data === 'info') {
      if (this.infopage === true) {
        this.showpayment = false;
        this.showPersonalInfo = true;
        this.showOrder = false;
      }
    }

    if (data === 'payment') {
      if (this.paymentpage === true) {
        this.showpayment = true;
        this.showPersonalInfo = false;
        this.showOrder = false;
      }
    }
  }

  changeAddress() {
    this.showOrder = false;
    this.showPersonalInfo = true;
    this.showpayment = false;
  }

  openModal(template: TemplateRef<any>, x) {
    this.modalRef = this.modalService.show(template);
    this.shipping = Object.assign({}, x);
  }
  openpopUp(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  showOverview() {
    this.paymentpage = true;
    this.showpayment = true;
    this.showOrder = false;
    window.scrollTo(0, 0);
  }

  GetDeliveryAddress(delivery) {
    this.deliveryplace = delivery;
    this.data = delivery.id;
    this.id = delivery.id;
  }

  public showOrderView() {
    this.orderpage = true;
    this.infopage = true;
    this.showOrder = true;
    this.showPersonalInfo = false;
    window.scrollTo(0, 0);
  }
  diableForm() {
    return (
      !this.disableCity ||
      !this.disableState ||
      !this.disableDistrict ||
      this.addressSaveLoad
    );
  }
}
