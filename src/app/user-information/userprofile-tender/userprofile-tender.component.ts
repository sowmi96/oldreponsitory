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
  selector: 'app-userprofile-tender',
  templateUrl: './userprofile-tender.component.html',
  styleUrls: ['./userprofile-tender.component.css']
})
export class UserprofileTenderComponent implements OnInit {
  tenderForm: FormGroup;

  public name: any;
  public supplier: any;
  public accno: number;
  public hideform = false;
  public showbutton: Boolean = false;
  public allowedit = true;
  public SupplierList: any = [{}];
  public bussinessList: any = [{}];
  public Bussiness: Boolean = null;
  public Supplier: Boolean = null;
  public user;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastsManager,
    private tender: GeneralService,
    private tendershare: SharedService
  ) {
    this.tenderForm = fb.group({
      supplier: [name, Validators.required],
      accountNumber: [name, Validators.required],
      BussinessType: [name, Validators.required],

      SupplierType: [name, Validators.required]
    });
  }

  ngOnInit() {
    this.user = this.tender.getUserId();
    this.getBusinessType();
    this.getSupplierType();
    this.getDetails();
  }
  getBusinessType() {
    this.tender.getRequest('businessTypeMaster/all').subscribe(
      res => {
        this.bussinessList = res.responseContent;
      },
      e => {},
      () => {
        /*alert('login successfull');*/
      }
    );
  }

  getSupplierType() {
    this.tender.getRequest('suppliertypemaster/all').subscribe(
      res => {
        this.SupplierList = res.responseContent;
      },
      e => {},
      () => {
        /*alert('login successfull');*/
      }
    );
  }

  isNumber(evt) {
    evt = evt ? evt : window.event;
    const charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  EditField() {
    this.allowedit = false;
    this.showbutton = true;
  }
  EditCancel() {
    this.allowedit = true;
    this.showbutton = false;
    this.name = this.supplier.supplierName;
    this.accno = this.supplier.accountNumber;
    this.Bussiness = this.supplier.businessTypeId;
    this.Supplier = this.supplier.supplierTypeId;
  }

  getDetails() {
    this.tendershare.showLoading(true);
    this.tender.getRequest('supplier/master/details?id=' + this.user).subscribe(
      res => {
        this.tendershare.showLoading(false);
        this.supplier = res.responseContent;
        if (this.supplier.supplierId === null) {
          this.hideform = true;
        }
        this.name = this.supplier.supplierName;
        this.accno = this.supplier.accountNumber;
        this.Bussiness = this.supplier.businessTypeId;
        this.Supplier = this.supplier.supplierTypeId;
      },
      e => {
        this.tendershare.showLoading(false);
      },
      () => {
        /*alert('login successfull');*/
      }
    );
  }

  onSubmit(value) {
    this.tenderForm.controls['supplier'].markAsTouched();
    this.tenderForm.controls['accountNumber'].markAsTouched();
    this.tenderForm.controls['BussinessType'].markAsTouched();
    this.tenderForm.controls['SupplierType'].markAsTouched();

    if (this.tenderForm.valid) {
      this.tendershare.showLoading(true);
      const data = {
        supplierId: this.supplier.supplierId,
        supplierName: value.supplier,
        businessTypeId: value.BussinessType,
        supplierTypeId: value.SupplierType,

        accountNumber: value.accountNumber
      };
      this.tender.postRequest2('supplier/master/details', data).subscribe(
        res => {
          this.tendershare.showLoading(false);
          this.toastr.success('Supplier Details Updated');

          this.showbutton = false;
          this.allowedit = true;
          this.getDetails();
        },
        e => {
          this.tendershare.showLoading(false);
          this.toastr.success('Couldn\'t update Supplier Details');
        },
        () => {
          /*alert('login successfull');*/
        }
      );
    }
  }
}
