import { Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-userprofile-kntschem-reg',
  templateUrl: './userprofile-kntschem-reg.component.html',
  styleUrls: ['./userprofile-kntschem-reg.component.css']
})
export class UserprofileKntschemRegComponent implements OnInit {
  kntForm: FormGroup;
  public maxDate: Date;

  public Nomineename: any;
  public userId: any;
  public allowedit: Boolean = true;
  public NomineeRelation = null;
  public Gender = null;
  public relationList: any;
  public genderList: any;
  public Nominee: any = [{}];
  public Relation = null;
  public date: any;
  public showbutton: Boolean = false;

  public contactNo: any;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastsManager,
    private kntservice: GeneralService,
    private kntshare: SharedService
  ) {
    this.kntForm = fb.group({
      name: [name, Validators.required],
      relationship: [name, Validators.required],
      gender: [name, Validators.required],

      dob: [name, Validators.required],
      contact: [name, Validators.required]
    });
  }

  ngOnInit() {
    this.maxDate=new Date();

    this.maxDate.setDate(this.maxDate.getDate() + 0);
    this.userId = this.kntservice.getUserId();
    this.getRelationship();
    this.getGender();

    this.getNominee();
  }

  getRelationship() {
    this.kntservice.getRequest('relationship/getAll').subscribe(
      res => {
        this.relationList = res.responseContents;
      },
      e => {},
      () => {}
    );
  }

  getGender() {
    this.kntservice.getRequest('getGenderList').subscribe(
      res => {
        this.genderList = res.responseContents;
      },
      e => {},
      () => {}
    );
  }

  getNominee() {
    this.kntshare.showLoading(true);
    this.kntservice
      .getRequest('getCustomerNominee?userId=' + this.userId)
      .subscribe(
        res => {
          this.kntshare.showLoading(false);

          this.Nominee = res.responseContent;
          // if(this.Nominee.length==0|| this.Nominee.length==null){
          //   this.allowedit=false;
          // }
          this.Nomineename = this.Nominee.nomineeName;
          this.Relation = this.Nominee.relationShip;
          this.Gender = this.Nominee.gender;
          this.date = moment(this.Nominee.candidateDateOfBirth);
          this.date = this.date.format('MM-DD-YYYY');
          this.date = new Date(this.date);
          this.contactNo = this.Nominee.mobileNumber;
          this.allowedit = true;
        },
        e => {
          this.kntshare.showLoading(false);
        },
        () => {}
      );
  }

  EditField() {
    this.allowedit = false;
    this.showbutton = true;
  }
  EditCancel() {
    this.allowedit = true;
    this.showbutton = false;
    this.Nomineename = this.Nominee.nomineeName;
    this.Relation = this.Nominee.relationShip;
    this.Gender = this.Nominee.gender;
    this.date = moment(this.Nominee.candidateDateOfBirth);
    this.date = this.date.format('MM-DD-YYYY');
    this.date = new Date(this.date);
    this.contactNo = this.Nominee.mobileNumber;
  }
  isNumber(evt) {
    evt = evt ? evt : window.event;
    const charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onSubmit(value) {
    this.kntForm.controls['name'].markAsTouched();
    this.kntForm.controls['relationship'].markAsTouched();
    this.kntForm.controls['gender'].markAsTouched();
    this.kntForm.controls['dob'].markAsTouched();
    this.kntForm.controls['contact'].markAsTouched();

    if (this.kntForm.valid) {
      if (this.Nominee != null) {
        const data = {
          dateOfBirth: value.dob,
          userId: this.userId,
          id: this.Nominee.id,
          name: value.name,
          gender: value.gender,
          mobileNumber: value.contact,
          relationship: value.relationship
        };
        this.kntservice.postRequest2('updateCustomerNominee', data).subscribe(
          res => {
            this.toastr.success('Nominee Details Updated');

            this.getNominee();
            this.showbutton = false;
          },
          e => {
            this.toastr.success('Could not update Nominee Details');
          }
        );
      } else {
        const data1 = {
          dateOfBirth: value.dob,
          userId: this.userId,
          name: value.name,
          gender: value.gender,
          mobileNumber: value.contact,
          relationship: value.relationship
        };
        this.kntservice.postRequest2('addCustomerNominee', data1).subscribe(
          res => {
            this.toastr.success('Nominee Details Added');

            this.getNominee();
            this.showbutton = false;
          },
          e => {
            this.toastr.success('Could not add Nominee Details');
          }
        );
      }
    }
  }
}
