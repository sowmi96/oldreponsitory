import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GeneralService } from '../../general.service';
import { PageChangedEvent } from 'ngx-bootstrap';
import { SharedService } from '../../shared.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-career-details',
  templateUrl: './career-details.component.html',
  styleUrls: ['./career-details.component.css']
})
export class CareerDetailsComponent implements OnInit {
  career: any;
  public items: Array<string> = [
    'All',
    'none',
    'applied',
    'written',
    'offered'
  ];
  public tabList: any[] = [
    { listItem: 'All' },
    { listItem: 'Open' },
    { listItem: 'Closed' }
  ];
  private value: any = {};
  private _disabledV: string;
  private disabled: boolean;
  public selectedItem = false;
  public isActive = false;
  public show: boolean;
  public shouldShow = true;
  currentCareer: any;
  toggleIcon = true;

  public startItem;
  public endItem;
  returnedArray = [];
  selectedData: any = [];
  tenderFilter = 'All';
  userId: any;

  constructor(
    private careerService: GeneralService,
    private ss: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = this.careerService.getUserId();
    this.getCareers();
  }

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {}

  public removed(value: any): void {}

  public typed(value: any): void {}

  public refreshValue(value: any): void {
    this.value = value;
  }

  listClick(event, newValue) {
    this.selectedItem = newValue;
  }
  toggle(event, arg) {
    if (arg === this.currentCareer) {
      this.currentCareer = '';
    } else {
      this.currentCareer = arg;
    }
  }

  pageChanged(event: PageChangedEvent): void {
    this.startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;

    this.returnedArray = this.career.slice(this.startItem, this.endItem);
  }

  onDropdownChange(status) {
    this.tenderFilter = status;
    this.career = [];
    this.career = this.selectedData.filter(x => x.jobStatus === status);
    if (status === 'All') {
      this.career = this.selectedData;
    }
    this.pageChanged({ itemsPerPage: 5, page: 1 });
  }

  getCareers() {
    this.ss.showLoading(true);
    if (this.userId == null || this.userId === undefined) {
      this.careerService.getRequest1('getAllJobs').subscribe(
        res => {
          this.ss.showLoading(false);
          this.career = res.responseContents;
          this.selectedData = this.career;
          this.returnedArray = this.career.slice(0, 5);
        },
        e => {
          this.ss.showLoading(false);
        },
        () => {}
      );
    } else {
      this.careerService.getRequest1('getAllJobs?id=' + this.userId).subscribe(
        res => {
          this.ss.showLoading(false);
          this.career = res.responseContents;
          this.selectedData = this.career;
          this.returnedArray = this.career.slice(0, 5);
        },
        e => {
          this.ss.showLoading(false);
        },
        () => {}
      );
    }
  }
  applyJob(jobid) {
    const loginStatus = window.localStorage.getItem('showLogin');
    if (loginStatus == null) {
      document.getElementById('login').click();
    } else {
      this.router.navigate(['/career/apply', jobid]);
      sessionStorage.setItem('JobID', jobid);
    }
  }
}
