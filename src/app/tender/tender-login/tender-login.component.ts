import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { GeneralService } from "../../general.service";
import { SharedService } from "../../shared.service";
import { RouterModule, Router } from "@angular/router";
import { ToastsManager } from "ng2-toastr";
// import {HeaderComponent} from '../header/header.component';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
@Component({
  selector: "app-tender-login",
  templateUrl: "./tender-login.component.html",
  styleUrls: ["./tender-login.component.css"]
})
export class TenderLoginComponent implements OnInit {
  fileNames: any;
  public emailPattern = "[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}";
  userdata: any;
  fileUploadStatus = false;
  userId: any;
  filesToUpload: Array<File> = [];
  inputEl: any;
  public hidecheck: any;
  tenderDetails: any = [];
  tenderForm: FormGroup;
  checkboxValue: boolean;
  checkboxValue1 = false;
  example = { businessAddres1: "", businessAddres2: "", businessPincode: "" };
  example1 = { homeAddress1: "", homeAddress2: "", homePincode: "" };
  countryList = [];
  countryList1 = [];
  stateList = [];
  cityList = [];
  businessId = [];
  supplierId = [];
  businessCountry = null;
  businessState = null;
  businessCity = null;
  homeCountry = null;
  homeState = null;
  homeCity = null;
  supplierValueId = null;
  businessValueId = null;
  password1: any = "";
  name1: any = "";
  email: any = "";
  mobile: any;
  userStatus = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private cd: ChangeDetectorRef,
    private tenderformservice: GeneralService,
    private toastr: ToastsManager,
    private ss: SharedService
  ) {
    this.tenderForm = fb.group({
      supplierName: [name, Validators.required],
      businessAddress1: [name, Validators.required],
      businessAddress2: [name, Validators.required],
      country: [name, Validators.required],
      city: [name, Validators.required],
      state: [name, Validators.required],
      pincode: [null, Validators.required],
      homeAddress1: [name, Validators.required],
      homeAddress2: [name, Validators.required],
      homeCountry: [name, Validators.required],
      homeState: [name, Validators.required],
      homeCity: [name, Validators.required],
      homePincode: [null, Validators.required],
      //  'mobileNumber': ['',Validators.required],
      landlineNumber: [""],
      checkboxVal: [name, Validators.required],
      checkboxVal2: [name, Validators.required],
      accountNumber: ["", Validators.required],
      //   'PrimaryEmailid': [name,[Validators.required, Validators.emai]],
      SecondaryEmailid: [name, []],
      supplierTypeId: [name, Validators.required],
      businessTypeId: [name, Validators.required],
      // file: [null, Validators.required],
      name: [name],
      email: [name],
      password: [""],
      mobile: [""]
      // 'uploadFile': [null,]
    });
  }

  ngOnInit() {
    this.getCountry();

    this.getBusinessType();
    this.getSupplierType();

    this.ss.userLoginSuccess$.subscribe(res => {
      this.userdata = res;
    });

    this.userdata = this.tenderformservice.getUserId();
    if (this.userdata !== undefined || this.userdata != null) {
      this.getTenderRegistered();
    } else {
      this.router.navigate(["tender/login"]);
    }
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.tenderForm.patchValue({
          file: reader.result
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  isNumber(evt) {
    evt = evt ? evt : window.event;
    const charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onCountryChange(country) {
    this.businessCountry = country;
    this.getStatelist();
  }

  onStateChange(country) {
    this.businessState = country;
    this.getDistlist();
  }

  onCityChange(country) {
    this.businessCity = country;
  }

  onCountryChange1(country) {
    this.homeCountry = country;
    this.getStatelist();
  }

  onStateChange1(country) {
    this.homeState = country;
    this.getDistlist();
  }

  onCityChange1(country) {
    this.homeCity = country;
  }

  onSupplierChange(val) {
    this.supplierValueId = val;
  }

  onBusinessChange(val) {
    this.businessValueId = val;
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.fileNames = fileInput.target.value.split("\\").pop();

    // this.product.photo = fileInput.target.files[0]['name'];
  }

  newFunction() {
    if (this.checkboxValue === true) {
      this.example1.homeAddress1 = this.example.businessAddres1;
      this.example1.homeAddress2 = this.example.businessAddres2;
      this.homeCountry = this.businessCountry;
      this.homeState = this.businessState;
      this.homeCity = this.businessCity;
      this.example1.homePincode = this.example.businessPincode;
    } else {
      this.example1.homeAddress1 = "";
      this.example1.homeAddress2 = "";
      this.homeCountry = null;
      this.homeState = null;
      this.homeCity = null;
      this.example1.homePincode = "";
      //  this.example.businessAddres1 = this.example1.homeAddress1;
      // this.timeVar = " hours";
      // actually this else part shouldn't be needed
    }
  }

  newFunction1(value: boolean) {
    this.checkboxValue1 = value;
  }

  getTenderRegistered() {
    // let reqParam = 536;

    const reqParam = this.tenderformservice.getUserId();

    if (reqParam !== null && reqParam !== undefined) {
      this.ss.showLoading(true);
      this.tenderformservice
        .getRequest("supplier/master/checkSupplier?id=" + reqParam)
        .subscribe(
          res => {
            this.ss.showLoading(false);
            //  this.wishlist=res.responseContents;
            //  if(res.totalRecords == 1){
            //   this.ss.showLoading(false);
            //   this.router.navigate(['tender']);
            //  }else {
            //   this.ss.showLoading(false);
            //   this.router.navigate(['tender/login']);
            //  }
            if (res.totalRecords === 1) {
              this.ss.showLoading(false);
              this.router.navigate(["tender"]);
            } else {
              this.ss.showLoading(false);
              this.router.navigate(["tender/login"]);
            }
            if (res.responseContent != null) {
              if (res.responseContent.fileName == null) {
                this.fileUploadStatus = false;
              } else {
                this.fileUploadStatus = true;
                this.fileNames = res.responseContent.fileName;
              }
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
  }

  getBusinessType() {
    this.tenderformservice.getRequest("businesstypemaster/all").subscribe(
      res => {
        this.businessId = res.responseContent;
      },
      e => {},
      () => {
        /*alert('login successfull');*/
      }
    );
  }

  getSupplierType() {
    this.tenderformservice.getRequest("suppliertypemaster/all").subscribe(
      res => {
        this.supplierId = res.responseContent;
      },
      e => {},
      () => {
        /*alert('login successfull');*/
      }
    );
  }

  getCountry() {
    this.tenderformservice.getRequest("getAllCountryList").subscribe(
      res => {
        this.countryList = res.responseContents;
        this.countryList1 = res.responseContents;
      },
      e => {},
      () => {
        /*alert('login successfull');*/
      }
    );
  }

  getStatelist() {
    const reqParam = this.businessCountry;
    this.tenderformservice
      .getRequest("getStateListByCountry/" + reqParam)
      .subscribe(
        res => {
          this.stateList = res.responseContents;
        },
        e => {},
        () => {
          /*alert('login successfull');*/
        }
      );
  }

  getDistlist() {
    const reqParam = this.businessState;

    this.tenderformservice
      .getRequest("getDistrictListByState/" + reqParam)
      .subscribe(
        res => {
          this.cityList = res.responseContents;
        },
        e => {},
        () => {
          /*alert('login successfull');*/
        }
      );
  }

  submit(value) {
    this.tenderForm.controls["supplierName"].markAsTouched();
    this.tenderForm.controls["businessAddress1"].markAsTouched();
    this.tenderForm.controls['businessAddress2'].markAsTouched();
    this.tenderForm.controls['country'].markAsTouched();
    this.tenderForm.controls['city'].markAsTouched();
    this.tenderForm.controls['state'].markAsTouched();
    this.tenderForm.controls['pincode'].markAsTouched();
    this.tenderForm.controls['homeAddress1'].markAsTouched();
    this.tenderForm.controls['homeAddress2'].markAsTouched();
    this.tenderForm.controls['homeCountry'].markAsTouched();
    this.tenderForm.controls['homeCity'].markAsTouched();
    this.tenderForm.controls['homeState'].markAsTouched();
    this.tenderForm.controls['accountNumber'].markAsTouched();
    this.tenderForm.controls['supplierTypeId'].markAsTouched();
    this.tenderForm.controls['businessTypeId'].markAsTouched();
    //  this.tenderForm.controls['PrimaryEmailid'].markAsTouched();
    this.tenderForm.controls['homePincode'].markAsTouched();
    this.tenderForm.controls['SecondaryEmailid'].markAsTouched();
    this.tenderForm.controls['checkboxVal2'].markAsTouched();
    this.tenderForm.controls['name'].markAsTouched();
    this.tenderForm.controls['email'].markAsTouched();
    this.tenderForm.controls['mobile'].markAsTouched();
    this.tenderForm.controls['password'].markAsTouched();
    if (this.checkboxValue1 === false) {
      this.hidecheck = true;
    } else {
      this.hidecheck = false;
    }
    if (this.tenderForm.valid && this.checkboxValue1) {
      if (this.userdata !== undefined) {
        const reqParam = this.tenderformservice.getUserId();
        this.tenderDetails = {
          supplierName: value.supplierName,
          supplierTypeId: value.supplierTypeId,
          //  "supplierTypeId": 3,
          businessAddress: {
            addresLineOne: value.businessAddress1,
            addressLineTwo: value.businessAddress2,
            countryId: value.country,
            // "countryId": 1,
            stateId: value.state,
            //   "stateId": 1,
            districtId: value.city,
            //  "districtId": 1,
            pin: value.pincode
          },
          homeAddress: {
            addresLineOne: value.homeAddress1,
            addressLineTwo: value.homeAddress2,
            countryId: value.homeCountry,
            //  "countryId": 1,
            stateId: value.homeState,
            //   "stateId": 1,
            districtId: value.homeCity,
            //   "districtId": 1,
            pin: value.homePincode
          },
          //   "primaryContactNumber": value.mobileNumber.toString(),
          secondaryContactNumber: value.landlineNumber.toString(),
          // "uploadFilePath": value.file,
          //    "primaryEmail": value.PrimaryEmailid,
          secondaryEmail: value.SecondaryEmailid,
          businessTypeId: value.businessTypeId,
          // "businessTypeId": 1,
          accountNumber: value.accountNumber,
          userId: reqParam
        };
      } else {
        this.tenderDetails = {
          supplierName: value.supplierName,
          supplierTypeId: value.supplierTypeId,
          //  "supplierTypeId": 3,
          businessAddress: {
            addresLineOne: value.businessAddress1,
            addressLineTwo: value.businessAddress2,
            countryId: value.country,
            //   "countryId": 1,
            stateId: value.state,
            //  "stateId": 1,
            districtId: value.city,
            //  "districtId": 1,
            pin: value.pincode
          },
          homeAddress: {
            addresLineOne: value.homeAddress1,
            addressLineTwo: value.homeAddress2,
            countryId: value.homeCountry,
            //  "countryId": 1,
            stateId: value.homeState,
            //   "stateId": 1,
            districtId: value.homeCity,
            //   "districtId": 1,
            pin: value.homePincode
          },
          //  "primaryContactNumber": value.mobileNumber.toString(),
          secondaryContactNumber: value.landlineNumber.toString(),
          // "uploadFilePath": value.file,
          //  "primaryEmail": value.PrimaryEmailid,
          secondaryEmail: value.SecondaryEmailid,
          businessTypeId: value.businessTypeId,
          // "businessTypeId": 1,
          accountNumber: value.accountNumber,
          userId: null,
          userDetails: {
            emailId: this.email,
            mobileNumber: this.mobile.toString(),
            password: this.password1,
            name: this.name1
          }
        };
      }

      this.upload();
    }
  }

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i], files[i]['name']);
    }

    formData.append('supplierDetails', JSON.stringify(this.tenderDetails));

    if (this.tenderForm.valid) {
      this.ss.showLoading(true);
      this.tenderformservice
        .postRequest('trendRegistration', formData)
        .subscribe(
          res => {
            this.ss.showLoading(false);
            if (res.statusCode !== 0) {
              this.toastr.error(res.errorDescription);
            } else {
              this.toastr.success('Registered successfully');
              if (res.statusCode === 0) {
                if (
                  this.userdata === undefined ||
                  this.userdata === '' ||
                  this.userdata == null
                ) {
                  const reqParam = {
                    emailId: this.email,
                    password: this.password1
                  };
                  this.tenderformservice
                    .postRequest('signIn', reqParam)
                    .subscribe(res => {
                      this.router.navigate(['tender']);
                      // this.headercomponent.ngOnInit();

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
                          res.authenticatedUser.username
                        );

                        window.localStorage.setItem('showLogin', 'true');
                        window.localStorage.setItem(
                          'co-optex-emailId',
                          this.email
                        );
                        this.ss.senduserInfo(res.authenticatedUser.id);
                        // this.headercomponent.getWishlist();
                        // this.headercomponent.getCartdetails1();
                        // this.logincomponent.getCartdetails1();
                        // this.logincomponent.notificationlist();
                        // this.logincomponent.allNotification();
                        // this.logincomponent.getWishlist();
                        // }
                        //  this.ss.changeshowDiv4(false);
                        //  this.logincomponent.closeLogin();
                        this.ss.checkuserId(res.authenticatedUser.id);
                      }
                    });
                } else {
                  this.router.navigate(['tender']);
                }
              }

              // this.tenderForm.reset();
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
      this.toastr.error('The Form not valid');
    }
  }
}
