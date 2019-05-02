import { SharedService } from './shared.service';

import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { GeneralService } from './general.service';
import { Subscription } from 'rxjs/Subscription';
import { ToastsManager } from 'ng2-toastr';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SharedService]
})
export class AppComponent implements OnInit, OnDestroy {
  showPageLoading: Boolean;
  title = 'app';
  loadSubscription: Subscription;
  message: string;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  constructor(
    private generalService: GeneralService,
    private ss: SharedService,
    public toastr: ToastsManager,
    vRef: ViewContainerRef,
    private location: Location,
    private router: Router
  ) {
    this.toastr.setRootViewContainerRef(vRef);
  }
  ngOnInit() {
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((ev: any) => {
      if (ev instanceof NavigationStart) {
        if (ev.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (ev instanceof NavigationEnd) {
        if (ev.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else {
          window.scrollTo(0, 0);
        }
      }
      const currUrl = ev.url;

      if (currUrl !== undefined && currUrl !== '/product/Allproduct') {
        this.ss.getSearchValue('');
      }
    });
  }
  ngOnDestroy() {
    this.loadSubscription.unsubscribe();
  }
}
