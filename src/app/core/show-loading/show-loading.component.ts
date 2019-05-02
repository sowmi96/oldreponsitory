import { SharedService } from '../../shared.service';
import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-show-loading',
  templateUrl: './show-loading.component.html',
  styleUrls: ['./show-loading.component.css'],
  providers: [SharedService]
})
export class ShowLoadingComponent implements OnInit {
  showLoadings: any = true;
  loadSubscription: Subscription;

  message: Boolean;

  constructor(private ss: SharedService) {}

  ngOnInit() {}
}
