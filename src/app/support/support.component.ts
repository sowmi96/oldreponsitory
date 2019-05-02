import { Component, OnInit } from '@angular/core';
import { GeneralService } from './../general.service';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';
import { ToastsManager } from 'ng2-toastr';

import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  supportForm: FormGroup;
  public newquery = true;
  public ticketid: any;
  public statusshow = false;
  public ticketstatus: any;
  public trackquery = false;
  public success = false;
  public failure = false;
  public buttontext: any = 'Submit';
  public emailPattern = '[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  public dropdown = null;
  public ticketNumber: any;
  public user = window.localStorage.getItem('co-optex-userId');
  public categoryList: any;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private Kntschema: GeneralService,
    private shared: SharedService
  ) {
    this.supportForm = fb.group({
      contact: [name, Validators.required],
      email: [name, Validators.required],
      category: [name, Validators.required],
      description: [name, Validators.required]
    });
  }
  ngOnInit() {
    this.Kntschema.getRequest1('helpDeskTicketCategory').subscribe(
      res => {
        this.categoryList = res.responseContent;
      },
      e => {},
      () => {}
    );
  }

  ticketStatus() {
    if (this.ticketid !== '') {
      this.shared.showLoading(true);
      this.Kntschema.getRequest1(
        'getTicketStatus?ticketId=' + this.ticketid
      ).subscribe(
        res => {
          if (res.statusCode === 0) {
            this.shared.showLoading(false);
            this.ticketstatus = res.responseContent.status;
            if (this.ticketstatus !== '') {
              this.statusshow = true;
            }
          }
        },
        e => {},
        () => {}
      );
    }
  }

  query() {
    this.newquery = true;
    this.trackquery = false;
    this.statusshow = false;

    this.ticketid = '';
  }
  trackQuery() {
    this.newquery = false;
    this.trackquery = true;
  }
  supportSave(data) {
    this.statusshow = false;
    this.user = window.localStorage.getItem('co-optex-userId');
    const support = {
      mobileNumber: data.contact,
      emailId: data.email,
      categoryId: data.category,
      description: data.description,
      userId: this.user
    };
    this.supportForm.controls['contact'].markAsTouched();
    this.supportForm.controls['email'].markAsTouched();
    this.supportForm.controls['category'].markAsTouched();
    this.supportForm.controls['description'].markAsTouched();
    if (this.supportForm.valid) {
      this.shared.showLoading(true);
      this.buttontext = 'Submitting';
      this.Kntschema.postRequest('addSupport', support).subscribe(
        res => {
          this.shared.showLoading(false);
          this.ticketNumber = res.responseContent.ticketNumber;
          this.supportForm.reset();
          this.failure = false;
          this.success = true;
          this.buttontext = 'Submit';
        },
        e => {
          this.success = false;
          this.shared.showLoading(false);

          this.failure = true;
          this.buttontext = 'Submit';
        },
        () => {}
      );
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
}
