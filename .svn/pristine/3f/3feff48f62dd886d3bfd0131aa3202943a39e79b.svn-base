import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import {  ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-career-login',
  templateUrl: './career-login.component.html',
  styleUrls: ['./career-login.component.css']
})
export class CareerLoginComponent implements OnInit {

  careerForm: FormGroup;
   checkboxValue1: boolean = false;
   businessCountry = null;
    businessState = null;
    businessCity = null;
    countryList = ["India","Australia","America"];
    stateList = ["Tamilnadu","Karnataka","Kerala"];
    cityList = ["Chennai","Banglore"];

  constructor(private fb: FormBuilder,private cd: ChangeDetectorRef,public router: Router) {
     this.careerForm = fb.group({
        'firstName': [name,Validators.required],
        'lastName': [name,Validators.required],
        'fatherName': [name,Validators.required],
        'motherName': [name,Validators.required],
        'spouseName': [name,Validators.required],
        'primaryNumber': [name,Validators.required],
        'secondaryNumber': [null,Validators.required],
        'primaryEmail': [name,[Validators.required,Validators.email]],
        'secondaryEmail': [name,[Validators.required]],
        'homeAddress1': [name,Validators.required],
        'homeAddress2': [name,Validators.required],
        'country': [name,Validators.required],
        'city': [null,Validators.required],
        'state': [null,Validators.required],
        'pincode': [null,Validators.required],
         file: [null, Validators.required]

      });
   }

  ngOnInit() {
  }

  onFileChange(event) {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.careerForm.patchValue({
          file: reader.result
       });
      
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  newFunction1(value:boolean) {
    this.checkboxValue1 = value;
  }

  submit(value){
    this.router.navigate(['career/details']);
  }


   onCountryChange(country) {
   this.businessCountry = country;
  }

  onStateChange(country) {
   this.businessState = country;
  }

  onCityChange(country) {
   this.businessCity = country;
  }



}