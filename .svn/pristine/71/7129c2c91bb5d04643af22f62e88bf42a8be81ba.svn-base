import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { SharedService } from '../../shared.service';
import { GeneralService } from '../../general.service';

@Component({
  selector: 'app-made-order-login',
  templateUrl: './made-order-login.component.html',
  styleUrls: ['./made-order-login.component.css']
})
export class MadeOrderLoginComponent implements OnInit {
  useridData: any;
  madeForm: FormGroup;
  password: any;
  confirmpassword: any;
  showPasswordCaution = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private ss: SharedService,
    private generalservice: GeneralService
  ) {
    this.madeForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.ss.$senduserInfoData.subscribe(res => {
      this.useridData = res;
    });
    this.useridData = this.generalservice.getUserId();
  }

  validatePassword() {
    if (this.password !== this.confirmpassword) {
      this.showPasswordCaution = true;
      return false;
    } else {
      this.showPasswordCaution = false;
      return true;
    }
  }

  submit(value) {
    this.router.navigate(['order']);
  }
}
