import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { GeneralService } from '../../general.service';
import { EventService } from './event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  public mainEvents: any = {
    loading: false,
    content: null
  };
  public news1: any = {
    loading: false,
    content: []
  };
  public news2 = {
    loading: false,
    content: []
  };
  public news3 = {
    loading: false,
    content: []
  };
  public otherNews = {
    loading: false,
    content: []
  };
  constructor(
    private eventService: EventService,
    private generalservice: GeneralService
  ) {}

  ngOnInit() {
    this.getMainEvents();
    this.getNews1();
    this.getNews2();
    this.getNews3();
    this.getOtherNews();
  }
  public getMainEvents() {
    this.mainEvents.loading = true;
    this.generalservice.getRequest('events?category=MainEventSlider').subscribe(
      res => {
        this.mainEvents.content = res.responseContent;
        this.mainEvents.loading = false;
      },
      err => {
        this.mainEvents.loading = false;
      }
    );
  }
  public getNews1() {
    this.news1.loading = true;
    this.generalservice.getRequest('events?category=News1').subscribe(
      res => {
        this.news1.content = res.responseContent;
        this.news1.loading = false;
      },
      err => {
        this.news1.loading = false;
      }
    );
  }
  public getNews2() {
    this.news2.loading = true;
    this.generalservice.getRequest('events?category=News2').subscribe(
      res => {
        this.news2.content = res.responseContent;
        this.news2.loading = false;
      },
      err => {
        this.news2.loading = false;
      }
    );
  }
  public getNews3() {
    this.news3.loading = true;
    this.generalservice.getRequest('events?category=News3').subscribe(
      res => {
        this.news3.content = res.responseContent;
        this.news3.loading = false;
      },
      err => {
        this.news3.loading = false;
      }
    );
  }
  public getOtherNews() {
    this.otherNews.loading = true;
    this.generalservice.getRequest('events?category=OtherNews').subscribe(
      res => {
        this.otherNews.content = res.responseContent;
        this.otherNews.loading = false;
      },
      err => {
        this.otherNews.loading = false;
      }
    );
  }
}
