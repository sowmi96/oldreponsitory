import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  showPage:  any;

  constructor(private route: ActivatedRoute,  private router1: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.showPage = params['page'];
    });
  }
}
