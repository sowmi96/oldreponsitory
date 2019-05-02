import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from '../../shared.service';
import { GeneralService } from '../../general.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  showEmailCaution = false;
  email: any;
  @ViewChild('closeButton') closeBtn1: ElementRef;
  public reset = 'Reset password';
  constructor(
    private ss: SharedService,
    private generalService: GeneralService,
    private toastr: ToastsManager
  ) {}

  ngOnInit() {}
  verifyEmail() {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!EMAIL_REGEXP.test(this.email) || this.email === '') {
      this.showEmailCaution = true;
      return false;
    } else {
      this.showEmailCaution = false;
      return true;
    }
  }
  clearField() {
    this.email = '';
  }
  closeDialog() {
    this.closeBtn1.nativeElement.click();
  }
  resetPassword() {
    if (this.email === '') {
      this.showEmailCaution = true;
    } else {
      if (this.verifyEmail()) {
        const reqParam = {
          emailId: this.email
        };
        this.reset = 'Please Wait...';
        this.showEmailCaution = false;
        this.generalService.postRequest('forgotPassword', reqParam).subscribe(
          res => {
            this.closeDialog();
            this.toastr.success(
              'Password reset link sent to your email id Successfully'
            );
            setTimeout(() => {
              this.clearField();
              this.closeDialog();
            }, 500);
          },
          e => {
            this.toastr.error('Couldn\'t send password reset link');
            this.reset = 'Reset Password';
          },
          () => {}
        );
      }
    }
  }
}
