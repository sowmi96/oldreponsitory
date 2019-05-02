import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from '../../shared.service';
import { GeneralService } from '../../general.service';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { EqualValidator } from '../../equal.validator';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @ViewChild('signUpForm') signUpForm: NgForm;
  name: any;
  @ViewChild('closeButton1') closeBtn1: ElementRef;
  email: any = '';
  password: any;
  mismatch: any = false;
  confirmpassword: any;
  mobile: any = '';
  showCaution = false;
  errorMessage = '';
  constructor(
    private ss: SharedService,
    private router: Router,
    private generalService: GeneralService,
    private toastr: ToastsManager
  ) {}

  ngOnInit() {
    this.ss.currentpassword1.subscribe(message => {
      this.password = message;
      this.signUpForm.form.markAsPristine();
      this.signUpForm.form.markAsUntouched();
      this.signUpForm.form.updateValueAndValidity();
    });
    this.ss.currentemail1.subscribe(message => (this.email = message));
    this.ss.currentname.subscribe(message => (this.name = message));
    this.ss.currentconfirmpassword.subscribe(
      message => (this.confirmpassword = message)
    );
    this.ss.currentmobile.subscribe(message => (this.mobile = message));
    this.clearField();
  }

  closeSignUp() {
    this.closeBtn1.nativeElement.click();
    this.clearField();
  }
  clearField() {
    this.name = '';
    this.email = '';
    this.mobile = '';
    this.password = '';
    this.confirmpassword = '';
  }

  verifyMobileNumber(event) {
    const pattern = /[0-9\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  validateSignup(signUpForm) {
    const reqParam = {
      emailId: this.email,
      mobileNumber: this.mobile,
      password: this.password,
      name: this.name
    };
    const password = signUpForm.value.ConfirmPassword1;
    const confirmpassworder = signUpForm.value.password1;
    if (password !== confirmpassworder) {
      this.mismatch = true;
    } else {
      this.showCaution = false;
      this.ss.showLoading(true);
      this.generalService.postRequest('signUp', reqParam).subscribe(
        res => {
          const emailId = this.email;
          const password = this.password;
          this.ss.showLoading(false);
          if (res.statusCode !== 0) {
            this.showCaution = true;
            this.errorMessage = res.errorDescription;
          } else {
            signUpForm.form.reset();
            this.toastr.success('Sign Up Successfull');
            this.clearField();
            this.closeSignUp();
            this.login(emailId, password);
          }
        },
        e => {
          this.ss.showLoading(false);
          this.showCaution = true;
          this.errorMessage = e.error.error;
        },
        () => {}
      );
    }
  }
  public login(email, password) {
    const reqParam = {
      emailId: email,
      password: password
    };
    this.generalService.postRequest('signIn', reqParam).subscribe(
      res => {
        this.ss.showLoading(false);
        this.ss.changeshowlogin(true);
        this.ss.changeuserDetail(res.authenticatedUser);
        if (typeof localStorage !== 'undefined') {
          window.localStorage.setItem('co-optex-sessionId', res['XSRF-TOKEN']);
          window.localStorage.setItem(
            'co-optex-userId',
            res.authenticatedUser.id
          );
          window.localStorage.setItem(
            'co-optex-userName',
            res.authenticatedUser.userName
          );

          window.localStorage.setItem('showLogin', 'true');
          window.localStorage.setItem('co-optex-emailId', email);
          this.ss.senduserInfo(res.authenticatedUser.id);
        }
        this.ss.changeshowDiv4(false);
        this.ss.checkuserId(res.authenticatedUser.id);
        this.router.navigate(['/profile']);
      },
      e => {
        this.errorMessage = e.error.error;
        this.ss.showLoading(false);
      },
      () => {}
    );
  }
}
