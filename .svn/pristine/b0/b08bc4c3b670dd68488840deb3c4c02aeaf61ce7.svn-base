import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GeneralService } from '../../general.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-documents-info',
  templateUrl: './documents-info.component.html',
  styleUrls: ['./documents-info.component.css']
})
export class DocumentsInfoComponent implements OnInit {
  @ViewChild('myInput') myInputVariable: ElementRef;
  hidefield1: boolean;
  fileStatus: any;
  fileUrl: any;
  saveDisable = false;
  public documentsInfoArr = [];
  filesToUpload: Array<File> = [];
  public hidefield: Boolean;
  public hideshow: boolean;
  fileName = '';

  constructor(
    private documentInfoservice: GeneralService,
    private toastr: ToastsManager
  ) {}

  ngOnInit() {
    this.getFileStatus();
  }

  fileChangeEvent(fileInput: any) {
    this.saveDisable = true;
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.fileName = fileInput.target.value.split('\\').pop();
  }
  public edit() {
    this.hideshow = false;
    this.hidefield = true;
  }

  onSave(event) {
    event.preventDefault();
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i], files[i]['name']);
    }

    if (files.length !== 0) {
      const reqParam = this.documentInfoservice.getUserId();
      // let reqParam = 547;
      this.documentInfoservice
        .postRequest2('updateUserDocuments?id=' + reqParam, formData)
        .subscribe(
          res => {
            if (res.statusCode !== 0) {
              this.toastr.error(res.errorDescription);
            } else {
              this.toastr.success(res.message);
              this.getFileStatus();
            }
          },
          e => {},
          () => {
            /*alert('login successfull');*/
          }
        );
    } else {
      this.toastr.error('Attach File');
    }
  }

  deleteFile() {
    //   let reqParam = 547;
    const reqParam = this.documentInfoservice.getUserId();
    this.documentInfoservice
      .getRequest('deleteUserDocuments?id=' + reqParam)
      .subscribe(
        res => {
          if (res.statusCode !== 0) {
            this.toastr.error(res.errorDescription);
          } else {
            this.toastr.success(res.message);
          }

          this.getFileStatus();
        },
        e => {},
        () => {
          /*alert('login successfull');*/
        }
      );

    this.getFileStatus();
  }

  getFileStatus() {
    //   let reqParam = 547;
    const reqParam = this.documentInfoservice.getUserId();
    this.documentInfoservice
      .getRequest('getUserDocuments?id=' + reqParam)
      .subscribe(
        res => {
          this.fileUrl = res.responseContent.fileName;
          if (this.fileUrl == null) {
            this.hidefield = true;
            this.hidefield1 = false;
            this.hideshow = false;
          } else {
            this.hidefield = false;
            this.hideshow = true;
            this.hidefield1 = false;
          }
          this.fileStatus = res.message;
        },
        e => {},
        () => {
          /*alert('login successfull');*/
        }
      );
  }

  displayDocInfoForm() {
    this.hidefield = false;
  }

  hideManageAddrForm() {
    if (this.fileUrl === null) {
      this.clearFormFields();
      this.hidefield1 = false;
      this.hidefield = true;
    } else {
      this.hidefield1 = false;
      this.hidefield = false;
      this.hideshow = true;
    }
  }

  // upload(){
  //   document.getElementById('file').click();

  // }

  editPopupShow() {
    document.getElementById('docInfoEditGroupId').style.display = 'block';
  }
  editPopupHide() {
    document.getElementById('docInfoEditGroupId').style.display = 'none';
  }

  onSubmit(value: any) {
    this.documentsInfoArr.push(value);
    document.getElementById('docInfoFormId').style.display = 'none';
    this.clearFormFields();
  }

  clearFormFields() {
    // const index = 0;
    // this.filesToUpload.splice(index, 1);
    this.myInputVariable.nativeElement.value = '';
  }
  download(event) {
    const reqParam = this.documentInfoservice.getUserId();
    window.open(
      this.documentInfoservice.newBaseUrl +
        'userDocument/download?id=' +
        reqParam
    );
    event.preventDefault();
  }
}
