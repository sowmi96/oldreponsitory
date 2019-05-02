import { SharedService } from '../../shared.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { GeneralService } from '../../general.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit, OnDestroy {
  showHeader = true;
  showPageLoading: Boolean = false;
  title = 'app';
  loadSubscription: Subscription;
  loadlogin: Subscription;
  message: string;
  showLoginPage: Boolean = false;

  constructor(
    private router: Router,
    private generalService: GeneralService,
    private ss: SharedService,
    private route: ActivatedRoute,
    public cdRef: ChangeDetectorRef
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.url;
        const token = this.route.snapshot.queryParams['id'];
        if (currentUrl === '/reset_password?id=' + token + '') {
          this.showHeader = true;
        } else {
          this.showHeader = true;
        }
      }
    });
  }
  ngOnInit() {
    this.ss.loadSubject$.subscribe(res => {
      if (res === true) {
        this.showPageLoading = true;
      } else {
        this.showPageLoading = false;
      }
    });
    this.loadlogin = this.ss.userObject$.subscribe(res => {
      this.showLoginPage = res.showLogin;
    });
  }
  ngOnDestroy() {
    this.loadSubscription.unsubscribe();
    this.loadlogin.unsubscribe();
  }
}
