import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SharedService } from './shared.service';

import { GeneralService } from './general.service';
import { Router } from '@angular/router';

@Injectable()
export class KntschemeGuard implements CanActivate {
  public userdata: any;
  public Kntdetail: any;

  constructor(
    private guard: GeneralService,
    private router: Router,
    private shared: SharedService
  ) {}
  canActivate() {
    this.userdata = this.guard.getUserId();
    if (this.userdata !== null) {
      this.guard
        .getRequest('checkKntRegisteredUser?id=' + this.userdata)
        .subscribe(
          res => {
            this.Kntdetail = res;
            if (this.Kntdetail.totalRecords !== 0) {
              this.shared.kntschemeset(1);
              this.router.navigate(['/knt_scheme']);
            }
          },
          e => {},
          () => {}
        );
    }

    return true;
  }
}
