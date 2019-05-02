import { Component, OnInit } from "@angular/core";
import { GeneralService } from "../../general.service";
import { SharedService } from "../../shared.service";
@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"]
})
export class NotificationComponent implements OnInit {
  notificationServiceall: any;
  notificationcountall: number;
  public user = window.localStorage.getItem("co-optex-userId");

  constructor(
    private notificationService: GeneralService,
    private ss: SharedService
  ) {}

  ngOnInit() {
    this.notificationall();
  }
  public notificationall() {
    this.ss.showLoading(true);
    this.notificationService
      .getRequest("allNotificationDetails?id=" + this.user)
      .subscribe(
        res => {
          this.ss.showLoading(false);
          this.notificationcountall = res.responseContents;
          this.ss.changenotiList(this.notificationcountall);
        },
        e => {
          this.ss.showLoading(false);
        },
        () => {}
      );
  }
}
