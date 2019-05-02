import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GeneralService } from '../../general.service';
import { ShowLoadingComponent } from '../../core/show-loading/show-loading.component';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-userprofile-myorder',
  templateUrl: './userprofile-myorder.component.html',
  styleUrls: ['./userprofile-myorder.component.css']
})
export class UserprofileMyorderComponent implements OnInit {
  public hidedata: Boolean;
  userId: any;
  @Output() clickEvent;
  @Output() valueChange = new EventEmitter();

  public myorder: any;

  constructor(
    private orderService: GeneralService,
    private ss: SharedService
  ) {}

  ngOnInit() {
    this.ss.showLoading(true);
    this.getWishlist();
  }

  public informationClick() {
    window.scroll(0, 0);
  }

  trackOrderPopupShow(event) {
    document.getElementById('' + event).style.display = 'block';
  }

  trackOrderPopupHide(event) {
    document.getElementById('' + event).style.display = 'none';
  }

  orderSelect(itemId) {
    this.informationClick();
    this.valueChange.emit({ page: 'myorderDetail', itemId: itemId });
  }

  getWishlist() {
    this.userId = this.orderService.getUserId();
    const reqParam = this.userId;
    this.orderService.getRequest('myorder?id=' + reqParam).subscribe(
      res => {
        this.myorder = res.responseContents;
        if (this.myorder == null) {
          this.hidedata = true;
          this.ss.showLoading(false);
        } else {
          this.ss.showLoading(false);
        }
      },
      e => {
        this.ss.showLoading(false);
      },
      () => {}
    );
  }

  supportFunc(event) {
    event.stopPropagation();
  }
}
