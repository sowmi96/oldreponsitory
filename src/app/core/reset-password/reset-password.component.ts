import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { GeneralService } from '../../general.service';
import { ToastsManager } from 'ng2-toastr';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  showPasswordCaution = false;
  showCaution = false;
  showPasswordlength: any;
  password: any;
  confirmpassword: any;
  id: number;
  routeSub: any;
  private sub: any;
  constructor(
    private ss: SharedService,
    private generalService: GeneralService,
    private toastr: ToastsManager,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}
  validatePassword() {
    if (
      this.password !== this.confirmpassword &&
      this.password !== '' &&
      this.confirmpassword !== ''
    ) {
      this.showPasswordCaution = true;
      this.showCaution = false;
      return false;
    } else {
      this.showPasswordCaution = false;
      this.showCaution = false;
      return true;
    }
  }

  checklength() {
    if (this.password.length < 6) {
      this.showPasswordlength = true;
    } else {
      this.showPasswordlength = false;
    }
  }
  submitPassword() {
    if (this.password.length < 6) {
      this.showPasswordlength = true;
    } else if (
      this.password === '' ||
      this.confirmpassword === '' ||
      this.password === undefined ||
      this.confirmpassword === undefined
    ) {
      this.showPasswordlength = false;

      this.showPasswordCaution = false;
      this.showCaution = true;
    } else {
      if (this.validatePassword()) {
        const reqParam = {
          token: this.route.snapshot.queryParams['id'],
          password: this.password
        };
        this.showPasswordCaution = false;
        this.showCaution = false;
        this.generalService.postRequest('resetPassword', reqParam).subscribe(
          res => {
            if (res.message === 'Updated successfully updated password') {
              this.toastr.success('Password changed Successfully');
              this.password = '';
              this.confirmpassword = '';
            } else {
              this.toastr.error(
                'This Request token has expired,please request another one'
              );
            }
          },
          e => {
            this.toastr.error('Something went wrong please Try Again');
          },
          () => {}
        );
      }
    }
  }
}
