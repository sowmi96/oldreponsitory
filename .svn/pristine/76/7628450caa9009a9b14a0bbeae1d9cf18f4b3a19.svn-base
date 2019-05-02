import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '../../general.service';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  photoUrl: any;
  userId: string;
  fileNames: any;
  filesToUpload: Array<File> = [];
  firstname: any;
  public tabText: any;
  showActive: any;
  orderClick: string;
  itemId: number;
  page: any;
  sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private generalService: GeneralService,
    public ss: SharedService
  ) {}

  ngOnInit() {
    this.userId = this.generalService.getUserId();
    this.sub = this.route.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.page = params['tab'] || 0;
      if (this.page === 'myorder') {
        this.tabText = 'myorder';
        this.showActive = 'myorder';
      } else {
        this.tabText = 'personal';
        this.showActive = 'personal';
      }
    });

    this.firstname = localStorage.getItem('co-optex-userName');
  }
  profileAcc(id) {
    if (document.getElementById(id + 'List').style.display === 'none') {
      document.getElementById(id + 'List').style.display = 'block';
      document.getElementById(id + 'Arr1').style.display = 'none';
      document.getElementById(id + 'Arr').style.display = 'block';
      if (id === 'accSetting') {
        document.getElementById('myOrdersId').style.borderTop =
          'solid 1px #979797';
        document.getElementById('myOrdersId').style.marginTop = '15px';
      }
    } else {
      document.getElementById(id + 'List').style.display = 'none';
      document.getElementById(id + 'Arr').style.display = 'none';
      document.getElementById(id + 'Arr1').style.display = 'block';
      if (id === 'accSetting') {
        document.getElementById('myOrdersId').style.borderTop = '0px';
        document.getElementById('myOrdersId').style.marginTop = '0px';
      }
    }
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.fileNames = fileInput.target.value.split('\\').pop();

    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i], files[i]['name']);
    }
    this.generalService
      .postRequest2('upload/profilePicture?id=' + this.userId, formData)
      .subscribe(
        res => {
          this.getUserInfo();
        },
        e => {},
        () => {}
      );
  }

  public getUserInfo() {
    const reqParam = {
      id: this.userId
    };

    this.generalService.postRequest1('userPersonalInfo', reqParam).subscribe(
      res => {
        this.ss.changepersonalInfo(res.responseContent);
        localStorage.setItem('firstname', res.responseContent.name);
        this.photoUrl = res.responseContent.photoUrl;
      },
      e => {},
      () => {}
    );
  }

  profileTabClick(text) {
    this.showActive = text;
    this.tabText = text;
  }
  displayCounter(count) {}

  orderOnClick(obj) {
    this.tabText = obj.page;
    this.itemId = obj.itemId;
  }
  Logout() {
    window.localStorage.removeItem('co-optex-sessionId');
    window.localStorage.removeItem('co-optex-userId');
    window.localStorage.removeItem('showLogin');
    window.localStorage.removeItem('co-optex-emailId');
    window.localStorage.removeItem('schemeaccess');

    location.reload();

    this.router.navigate(['/']);
  }
}
