import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userprofile-bulkorder',
  templateUrl: './userprofile-bulkorder.component.html',
  styleUrls: ['./userprofile-bulkorder.component.css']
})
export class UserprofileBulkorderComponent implements OnInit {

  public documentsInfoArr = [];
  public IDno:any;
  public fullName:any;
  public docRadio:string;
  docFilePath:any;

  constructor() { }

  ngOnInit() {
  }

  setRadio(value:string){
    this.docRadio = value;
  }



  displayDocInfoForm(){
    document.getElementById("docInfoFormId").style.display="block";
  }
  clearFormFields(){
    this.IDno = "";
    this.fullName = "";
  }
  hideManageAddrForm(){
    document.getElementById("docInfoFormId").style.display="none";
    this.clearFormFields();
  }
  onSubmit(value:any){

    this.documentsInfoArr.push(value);
    document.getElementById("docInfoFormId").style.display="none";
    this.clearFormFields();
  }
  editPopupShow(){
    document.getElementById("docInfoEditGroupId").style.display="block";
  }
  editPopupHide(){
    document.getElementById("docInfoEditGroupId").style.display="none";
  }

}
