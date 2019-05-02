import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { GeneralService } from '../../general.service';
import { ToastsManager } from 'ng2-toastr';
import { SharedService } from '../../shared.service';

import * as moment from 'moment';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-knt-scheme-login',
  templateUrl: './knt-scheme-login.component.html',
  styleUrls: ['./knt-scheme-login.component.css']
})
export class KntSchemeLoginComponent implements OnInit, OnDestroy {
  kntForm: FormGroup;
  public maxDate: Date;

  filesToUpload: Array<File> = [];

  checkboxValue: boolean;
  checkboxValue1 = false;
  mobile: any;
  example = { businessAddres1: '', businessAddres2: '', businessPincode: '' };
  example1 = { homeAddress1: '', homeAddress2: '', homePincode: '' };
  public customer: any;
  public fileshow: any;
  public filesend: any;
  public showfile: any = true;
  public showname: any = false;
  bussinesscountryList: any;
  bussinessstateList: any;
  bussinessDistrictList: any;
  bussinessCityList: any;
  homecountryList: any;
  homestateList: any;
  homeDistrictList: any;
  homeCityList: any;
  businessCountry = null;
  businessState = null;
  businessCity = null;
  bussinessDistrict = null;
  homeDistrict = null;
  homeCountry = null;
  homeState = null;
  homeCity = null;
  public hidecheck: any = false;
  public userdata = {
    name: null,
    primaryContactNumber: null,
    fileDetails: null,
    landlineNumber: null,
    businessAddress: null,
    nomineeDetails: null,
    homeAddress: null
  };
  public usercheck: any;
  public showSignup: any;
  public showCust: any;
  public userinfo: any = 0;
  public username: any;
  public usermail: any;
  public userpassword: any;
  public userpasswordconform: any;
  public contactNo: any;
  public landLine: any;
  public NomineeName: any;
  public NomineeRelation: any = null;
  public Gender: any = null;
  public DOB: any;
  public files: any;
  public NomineeNumber: any;
  public storedata: any;
  public genderList: any;
  public relationList: any;
  public name: any;
  public mobileNumber: any;
  public emailPattern = '[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  public buttontext: any = 'Register';
  stateload = false;
  kntFileName;

  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastsManager,
    private cd: ChangeDetectorRef,
    public router: Router,
    private kntservice: GeneralService,
    private kntshare: SharedService
  ) {
    this.kntForm = fb.group({
      businessAddress1: [name, Validators.required],
      businessAddress2: [name, Validators.required],
      country: [name, Validators.required],
      city: [name, Validators.required],
      state: [name, Validators.required],
      district: [name, Validators.required],
      pincode: [name, Validators.required],
      homeAddress1: [name, Validators.required],
      homeAddress2: [name, Validators.required],
      homeCountry: [name, Validators.required],
      homeState: [name, Validators.required],
      homeDistrict: [name, Validators.required],
      homeCity: [name, Validators.required],
      homePincode: [name, Validators.required],
      mobileNumber: [name],
      landlineNumber: [name],
      checkboxVal: [name],
      Nomineename: [name, Validators.required],
      NomineeRelationship: [name, Validators.required],
      NomineeGender: [name, Validators.required],
      NomineeDob: [name, Validators.required],
      Nomineecontact: [name, Validators.required],
      username: [null],
      useremail: [null],
      userpassword: [null],

      file: [null]
    });
  }

  ngOnInit() {
    this.maxDate = new Date();

    this.maxDate.setDate(this.maxDate.getDate() + 0);

    this.kntservice.getRequest('relationship/getAll').subscribe(
      res => {
        this.relationList = res.responseContents;
      },
      e => {},
      () => {}
    );

    this.kntservice.getRequest('getGenderList').subscribe(
      res => {
        this.genderList = res.responseContents;
      },
      e => {},
      () => {}
    );

    this.kntservice.getRequest('getAllCountryList').subscribe(
      res => {
        this.bussinesscountryList = res.responseContents;
        this.stateload = true;
        this.homecountryList = res.responseContents;
      },
      e => {},
      () => {}
    );



    this.subscription = this.kntshare.userLoginSuccess$.subscribe(astronaut => {
      this.usercheck = astronaut;
      if (this.usercheck != null || this.usercheck !== undefined) {
        this.userinfo = 0;
        this.kntshare.showLoading(true);
        this.kntservice
          .getRequest('checkKntRegisteredUser?id=' + this.usercheck)
          .subscribe(res => {
            if (res.totalRecords !== 0) {
              this.kntshare.showLoading(false);

              this.kntshare.kntschemeset(1);
              this.router.navigate(['/knt_scheme']);
            } else {
              this.kntservice
                .getRequest('getUserDetails?id=' + this.usercheck)
                .subscribe(
                  res => {
                    this.kntshare.showLoading(false);
                    this.usermail = '';
                    this.userpassword = '';
                    this.mobileNumber = '';

                    this.kntForm.get('useremail').setValue('one@gmail.com');

                    this.kntForm.get('userpassword').setValue('oneygggyyyyvg');

                    this.kntForm.get('mobileNumber').setValue('9998977788');

                    this.userdata = res.responseContent;
                    this.customer = this.userdata.name;
                    this.contactNo = this.userdata.primaryContactNumber;
                    this.landLine = this.userdata.landlineNumber;
                    this.fileshow = this.userdata.fileDetails.originalFileName;
                    if (this.fileshow == null) {
                      this.showfile = true;
                    } else {
                      this.filesend = this.fileshow;
                      this.showfile = false;
                      this.showname = true;
                    }

                    this.example.businessAddres1 = this.userdata.businessAddress.addressLineOne;
                    this.example.businessAddres2 = this.userdata.businessAddress.addressLineTwo;
                    this.example.businessPincode = this.userdata.businessAddress.pin;
                    this.businessCountry =
                      this.userdata.businessAddress.countryId === 0
                        ? null
                        : this.userdata.businessAddress.countryId;
                    this.onCountryChange(this.businessCountry, 'tsbind');
                    this.businessState =
                      this.userdata.businessAddress.stateId === 0
                        ? null
                        : this.userdata.businessAddress.stateId;
                    this.onStateChange(this.businessState, 'tsbind');
                    this.bussinessDistrict =
                      this.userdata.businessAddress.districtId === 0
                        ? null
                        : this.userdata.businessAddress.districtId;
                    this.NomineeName = this.userdata.nomineeDetails.name;
                    this.NomineeRelation =
                      this.userdata.nomineeDetails.relationshipId === 0
                        ? null
                        : this.userdata.nomineeDetails.relationshipId;
                    this.Gender =
                      this.userdata.nomineeDetails.genderId === 0
                        ? null
                        : this.userdata.nomineeDetails.genderId;
                    this.DOB = moment(this.userdata.nomineeDetails.dateOfBirth);
                    this.DOB = this.DOB.format('MM-DD-YYYY');
                    this.DOB = new Date(this.DOB);
                    this.NomineeNumber = this.userdata.nomineeDetails.mobileNumber;
                    this.onDistrictChange(this.bussinessDistrict, 'tsbind');
                    this.businessCity =
                      this.userdata.businessAddress.cityId === 0
                        ? null
                        : this.userdata.businessAddress.cityId;

                    this.example1.homeAddress1 = this.userdata.homeAddress.addressLineOne;
                    this.example1.homeAddress2 = this.userdata.homeAddress.addressLineTwo;
                    this.example1.homePincode = this.userdata.homeAddress.pin;

                    this.homeCountry = this.userdata.homeAddress.countryId;
                    this.homeCountryChange(this.homeCountry, 'tsbind');

                    this.homeState = this.userdata.homeAddress.stateId;
                    this.homeStateChange(this.homeState, 'tsbind');
                    this.homeDistrict = this.userdata.homeAddress.districtId;
                    this.homeDistrictChange(this.homeDistrict, 'tsbind');

                    this.homeCity = this.userdata.homeAddress.cityId;
                  },
                  e => {
                    this.kntshare.showLoading(false);
                  },
                  () => {}
                );
            }
          });
      }
    });

    this.usercheck = this.kntservice.getUserId();
    if (this.usercheck == null) {
      this.usercheck = 0;
    } else {
      this.kntshare.showLoading(true);
      this.kntservice
        .getRequest('getUserDetails?id=' + this.usercheck)
        .subscribe(
          res => {
            this.kntshare.showLoading(false);

            this.userdata = res.responseContent;
            this.kntForm.get('useremail').setValue('one@gmail.com');

            this.kntForm.get('userpassword').setValue('onegggg');

            this.kntForm.get('mobileNumber').setValue('9998977788');
            (this.files = null), (this.customer = this.userdata.name);
            this.contactNo = this.userdata.primaryContactNumber;
            this.landLine = this.userdata.landlineNumber;
            this.fileshow = this.userdata.fileDetails.originalFileName;
            if (this.fileshow == null) {
              this.showfile = true;
            } else {
              this.filesend = this.fileshow;
              this.showfile = false;
              this.showname = true;
            }

            this.example.businessAddres1 = this.userdata.businessAddress.addressLineOne;
            this.example.businessAddres2 = this.userdata.businessAddress.addressLineTwo;
            this.example.businessPincode = this.userdata.businessAddress.pin;
            this.businessCountry =
              this.userdata.businessAddress.countryId === 0
                ? null
                : this.userdata.businessAddress.countryId;
            this.onCountryChange(this.businessCountry, 'tsbind');
            this.businessState =
              this.userdata.businessAddress.stateId === 0
                ? null
                : this.userdata.businessAddress.stateId;
            this.onStateChange(this.businessState, 'tsbind');
            this.bussinessDistrict =
              this.userdata.businessAddress.districtId === 0
                ? null
                : this.userdata.businessAddress.districtId;
            this.NomineeName = this.userdata.nomineeDetails.name;
            this.NomineeRelation =
              this.userdata.nomineeDetails.relationshipId === 0
                ? null
                : this.userdata.nomineeDetails.relationshipId;
            this.Gender =
              this.userdata.nomineeDetails.genderId === 0
                ? null
                : this.userdata.nomineeDetails.genderId;
            if (this.userdata.nomineeDetails.dateOfBirth !== null) {
              this.DOB = moment(this.userdata.nomineeDetails.dateOfBirth);
              this.DOB = this.DOB.format('MM-DD-YYYY');
              this.DOB = new Date(this.DOB);
            }
            this.NomineeNumber = this.userdata.nomineeDetails.mobileNumber;
            this.onDistrictChange(this.bussinessDistrict, 'tsbind');
            this.businessCity =
              this.userdata.businessAddress.cityId === 0
                ? null
                : this.userdata.businessAddress.cityId;

            this.example1.homeAddress1 = this.userdata.homeAddress.addressLineOne;
            this.example1.homeAddress2 = this.userdata.homeAddress.addressLineTwo;
            this.example1.homePincode = this.userdata.homeAddress.pin;

            this.homeCountry =
              this.userdata.homeAddress.countryId === 0
                ? null
                : this.userdata.homeAddress.countryId;
            this.homeCountryChange(this.homeCountry, 'tsbind');

            this.homeState =
              this.userdata.homeAddress.stateId === 0
                ? null
                : this.userdata.homeAddress.stateId;
            this.homeStateChange(this.homeState, 'tsbind');
            this.homeDistrict =
              this.userdata.homeAddress.districtId === 0
                ? null
                : this.userdata.homeAddress.districtId;
            this.homeDistrictChange(this.homeDistrict, 'tsbind');

            this.homeCity =
              this.userdata.homeAddress.cityId === 0
                ? null
                : this.userdata.homeAddress.cityId;
          },
          e => {
            this.kntshare.showLoading(false);
          },
          () => {}
        );
    }
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.kntForm.patchValue({
          file: reader.result
        });

        this.cd.markForCheck();
      };
    }
  }

  CheckUser(data) {
    const email = data;
    this.userinfo = 0;
    const re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/gim;
    if (re.test(email)) {
      this.kntservice
        .getRequest('checkUserByEmailId?emailId=' + email)
        .subscribe(
          res => {
            this.userinfo = res.totalRecords;
          },
          e => {},
          () => {}
        );
    }
  }

  onCountryChange(country, checkdata) {
    this.kntservice
      .getRequest('getStateListByCountry/' + country)
      .subscribe(res => {
        this.stateload = false;
        this.bussinessstateList = res.responseContents;

        if (checkdata === 'tsbind') {
          this.businessState = this.userdata.businessAddress.stateId;
        }
      });
  }

  onStateChange(state, checkdata) {
    this.kntservice
      .getRequest('getDistrictListByState/' + state)
      .subscribe(res => {
        this.bussinessDistrictList = res.responseContents;

        if (checkdata === 'tsbind') {
          this.bussinessDistrict = this.userdata.businessAddress.districtId;
        }
      });
  }

  onDistrictChange(district, checkdata) {
    this.kntservice
      .getRequest('getCityListByDistrict/' + district)
      .subscribe(res => {
        this.bussinessCityList = res.responseContents;

        if (checkdata === 'tsbind') {
          this.businessCity = this.userdata.businessAddress.cityId;
        }
      });
  }

  homeCountryChange(country, check) {
    this.kntservice
      .getRequest('getStateListByCountry/' + country)
      .subscribe(res => {
        this.homestateList = res.responseContents;

        if (check === 'tsbind') {
          this.homeState = this.userdata.homeAddress.stateId;
        }
      });
  }

  homeStateChange(state, check) {
    this.kntservice
      .getRequest('getDistrictListByState/' + state)
      .subscribe(res => {
        this.homeDistrictList = res.responseContents;

        if (check === 'tsbind') {
          this.homeDistrict = this.userdata.homeAddress.districtId;
        }
      });
  }

  homeDistrictChange(dis, check) {
    this.kntservice
      .getRequest('getCityListByDistrict/' + dis)
      .subscribe(res => {
        this.homeCityList = res.responseContents;
        if (check === 'tsbind') {
          this.homeCity = this.userdata.homeAddress.cityId;
        }
      });
  }

  checkboxChange() {
    if (this.checkboxValue === true) {
      this.example1.homeAddress1 = this.example.businessAddres1;
      this.example1.homeAddress2 = this.example.businessAddres2;
      this.homeCountry = this.businessCountry;
      this.homeCountryChange(this.homeCountry, 'data');
      this.homeState = this.businessState;
      this.homeStateChange(this.homeState, 'data');
      this.homeDistrict = this.bussinessDistrict;
      this.homeDistrictChange(this.homeDistrict, 'data');
      this.homeCity = this.businessCity;

      this.example1.homePincode = this.example.businessPincode;
    } else {
      this.example1.homeAddress1 = '';
      this.example1.homeAddress2 = '';
      this.homeCountry = null;
      this.homeState = null;
      this.homeCity = null;
      this.homeDistrict = null;
      this.example1.homePincode = '';
    }
  }

  checkboxdata(value: boolean) {
    this.checkboxValue1 = value;
  }

  isNumber(evt) {
    evt = evt ? evt : window.event;
    const charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.kntFileName = fileInput.target.value.split('\\').pop();
  }
  submit(value) {
    this.kntForm.controls['businessAddress1'].markAsTouched();
    this.kntForm.controls['businessAddress2'].markAsTouched();
    this.kntForm.controls['country'].markAsTouched();
    this.kntForm.controls['city'].markAsTouched();
    this.kntForm.controls['state'].markAsTouched();
    this.kntForm.controls['pincode'].markAsTouched();
    this.kntForm.controls['district'].markAsTouched();

    this.kntForm.controls['homeAddress1'].markAsTouched();
    this.kntForm.controls['homeAddress2'].markAsTouched();
    this.kntForm.controls['homeCountry'].markAsTouched();
    this.kntForm.controls['homeCity'].markAsTouched();
    this.kntForm.controls['homeState'].markAsTouched();
    this.kntForm.controls['homeDistrict'].markAsTouched();
    this.kntForm.controls['homePincode'].markAsTouched();

    this.kntForm.controls['mobileNumber'].markAsTouched();
    this.kntForm.controls['landlineNumber'].markAsTouched();
    this.kntForm.controls['Nomineename'].markAsTouched();
    this.kntForm.controls['NomineeRelationship'].markAsTouched();
    this.kntForm.controls['NomineeGender'].markAsTouched();
    this.kntForm.controls['NomineeDob'].markAsTouched();
    this.kntForm.controls['username'].markAsTouched();
    this.kntForm.controls['useremail'].markAsTouched();
    this.kntForm.controls['Nomineecontact'].markAsTouched();
    this.kntForm.controls['userpassword'].markAsTouched();
    // this.tenderForm.controls['SecondaryEmailid'].markAsTouched();

    if (this.checkboxValue1 === false) {
      this.hidecheck = true;
    } else {
      this.hidecheck = false;
    }

    if (this.kntForm.valid && this.checkboxValue1) {
      this.buttontext = 'Registering';

      const user = this.usercheck;
      this.storedata = {
        userId: user || null,

        landlineNumber: value.landlineNumber,
        filePath: null,
        userDetails: {
          emailId: value.useremail,
          mobileNumber: value.mobileNumber,
          password: value.userpassword,
          name: value.username
        },
        businessAddress: {
          id: this.userdata.businessAddress
            ? this.userdata.businessAddress.id
            : null,
          addressLineOne: value.businessAddress1,
          addressLineTwo: value.businessAddress2,
          countryId: value.country,
          stateId: value.state,
          districtId: value.district,
          cityId: value.city,
          pin: value.pincode
        },
        homeAddress: {
          id: this.userdata.homeAddress ? this.userdata.homeAddress.id : null,
          addressLineOne: value.homeAddress1,
          addressLineTwo: value.homeAddress2,
          countryId: value.homeCountry,
          stateId: value.homeState,
          districtId: value.homeDistrict,
          cityId: value.homeCity,
          pin: value.homePincode
        },
        nomineeDetails: {
          userId: this.usercheck || null,
          id: this.userdata.nomineeDetails
            ? this.userdata.nomineeDetails.id
            : null,
          name: value.Nomineename,
          dateOfBirth: value.NomineeDob,
          mobileNumber: value.Nomineecontact,
          relationshipId: value.NomineeRelationship,
          genderId: value.NomineeGender
        }
      };
      this.upload();
    }
  }

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i], files[i]['name']);
    }

    formData.append('kntRegistrationDetails', JSON.stringify(this.storedata));
    this.kntservice.postRequest('kntRegistration', formData).subscribe(
      res => {
        this.buttontext = 'Register';
        if (res.statusCode === 1) {
          this.toastr.error(res.message);
        } else {
          this.toastr.success('KNt Registration successfully');
        }
        if (this.usercheck == null || this.usercheck === 0) {
          const reqParam = {
            emailId: this.storedata.userDetails.emailId,
            password: this.storedata.userDetails.password
          };
          this.kntservice.postRequest('signIn', reqParam).subscribe(
            res => {
              this.kntshare.changeshowlogin(true);
              this.kntshare.changeuserDetail(res.authenticatedUser);
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
                  this.storedata.userDetails.emailId
                );
                this.kntshare.senduserInfo(res.authenticatedUser.id);
              }
              this.kntshare.changeshowDiv4(false);

              this.kntshare.checkuserId(res.authenticatedUser.id);
              this.kntshare.kntschemeset(1);

              this.router.navigate(['/knt_scheme']);
            },
            e => {
              this.router.navigate(['/knt_scheme/login']);
            },
            () => {}
          );
        } else {
          this.kntshare.kntschemeset(1);

          this.router.navigate(['/knt_scheme']);
        }
      },
      e => {},
      () => {}
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

