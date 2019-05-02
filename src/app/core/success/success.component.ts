import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  public location: any;
  constructor(private router: Router) {}

  ngOnInit() {
    this.location = window.location.href;
  }
  Navigate() {
    if (this.location.includes('module=knt')) {
      this.router.navigate(['/knt_scheme']);
    } else if (this.location.includes('module=tender')) {
      this.router.navigate(['/tender']);
    } else {
      this.router.navigate(['/profile', { tab: 'myorder' }]);
    }
  }
}
