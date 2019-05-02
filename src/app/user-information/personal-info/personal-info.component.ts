import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../general.service';
import { ToastsManager } from 'ng2-toastr';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from '../../shared.service';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { ViewContainerRef } from '@angular/core';
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  userId: any;
  PersonalForm: FormGroup;
  getInfo: any;
  firstName: any = '';
  lastName: any = '';
  gender = false;
  gender1 = false;
  email: any = '';
  mobile: any = '';
  allowEdit = true;
  allowEdit1 = true;
  public showbutton = false;
  public userid;
  constructor(
    private fb: FormBuilder,
    private generalService: GeneralService,
    public info: SharedService,
    private toastr: ToastsManager,
    private router: Router
  ) {
    this.PersonalForm = fb.group({
      username: [name, Validators.required]
    });
  }
  ngOnInit() {
    this.info.currentpersonalInfo.subscribe(
      message => (this.firstName = message.name)
    );
    this.info.currentpersonalInfo.subscribe(
      message => (this.firstName = message.name)
    );
    let gender: any;
    this.info.currentpersonalInfo.subscribe(
      message => (gender = message.gender)
    );

    if (gender === 'Male') {
      this.gender = true;
      this.gender1 = false;
    } else if (gender == null) {
      this.gender = false;
      this.gender1 = false;
    } else {
      this.gender1 = true;
      this.gender = false;
    }

    this.info.currentpersonalInfo.subscribe(
      message => (this.email = message.emailId)
    );

    this.info.currentpersonalInfo.subscribe(
      message => (this.mobile = message.mobileNumber)
    );
    this.userid = this.generalService.getUserId();
    this.getUserInfo();
  }
  public radioCheck(radiochecked) {
    if (radiochecked === 'male') {
      this.gender = true;
      this.gender1 = false;
    } else if (radiochecked === 'female') {
      this.gender1 = true;
      this.gender = false;
    }
  }
  public deactivateAccount() {
    const reqParam = {
      id: this.userid
    };
    this.generalService
      .getRequest1('deActiveAccount?id=' + this.userid)
      .subscribe(
        res => {
          this.toastr.success('Account Deactivated');
          window.localStorage.removeItem('co-optex-sessionId');
          window.localStorage.removeItem('co-optex-userId');
          window.localStorage.removeItem('showLogin');
          window.localStorage.removeItem('co-optex-emailId');
          window.localStorage.removeItem('schemeaccess');

          location.reload();

          this.router.navigate(['/']);
        },
        e => {
          this.toastr.error('Deactivation Failed');
        },
        () => {}
      );
  }

  public cancel() {
    this.allowEdit = true;
    this.showbutton = false;
    this.getUserInfo();
  }

  public save() {
    let getGender;
    if (this.gender === true) {
      getGender = 'Male';
    } else {
      getGender = 'Female';
    }
    const reqParam = {
      userId: this.userId,
      name: this.firstName,
      gender: getGender
    };
    if (this.PersonalForm.valid) {
      this.info.showLoading(true);

      this.generalService.postRequest1('userUpdateProfile', reqParam).subscribe(
        res => {
          this.toastr.success('Successfully Updated ');
          this.getUserInfo();
          this.allowEdit = true;
          this.showbutton = false;
          this.info.showLoading(false);
        },
        e => {
          this.toastr.error('error while updating ');
          this.info.showLoading(false);
        },
        () => {}
      );
    }
  }

  public edit() {
    this.allowEdit = false;
    this.showbutton = true;
  }

  public getUserInfo() {
    this.userId = this.generalService.getUserId();
    const reqParam = {
      id: this.userId
    };

    this.generalService.postRequest1('userPersonalInfo', reqParam).subscribe(
      res => {
        this.info.changepersonalInfo(res.responseContent);
        this.firstName = res.responseContent.name;
        localStorage.setItem('firstname', this.firstName);
        if (res.responseContent.gender === 'Male') {
          this.gender = true;
          this.gender1 = false;
        } else if (res.responseContent.gender == null) {
          this.gender = false;
          this.gender1 = false;
        } else {
          this.gender1 = true;
          this.gender = false;
        }

        this.email = res.responseContent.emailId;
        this.mobile = res.responseContent.mobileNumber;
      },
      e => {},
      () => {}
    );
  }
}
