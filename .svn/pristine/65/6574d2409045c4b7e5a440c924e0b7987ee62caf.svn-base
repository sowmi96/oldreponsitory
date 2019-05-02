import { ShowLoadingComponent } from '../core/show-loading/show-loading.component';
import { SharedService } from '../shared.service';
import { GeneralService } from '../general.service';
import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { NgxCarouselModule } from 'ngx-carousel';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [NgxCarousel]
})
export class HomePageComponent implements OnInit {
  colors = {
    content: [],
    loading: false,
    error: false
  };
  errorLoading: any;
  sampleResp: any;
  public newArrival = {
    content: [],
    loading: false,
    error: false
  };
  public dealOfTheDay1 = {
    content: [],
    loading: false,
    error: false
  };
  public dealOfTheDay2 = {
    content: [],
    loading: false,
    error: false
  };
  public dealOfTheDay3 = {
    content: [],
    loading: false,
    error: false
  };
  public name: any;
  public mainslider = {
    content: [],
    loading: false,
    error: false
  };
  collections = {
    content: [],
    loading: false,
    error: false
  };

  /** End : Declarations */

  constructor(
    private generalService: GeneralService,
    private ss: SharedService,
    public carouselTile: NgxCarousel,
    private router: Router
  ) {}

  ngOnInit() {
    this.ss.selectedmenu('-1');
    this.ss.showLoading(false);
    this.getDeal1();
    this.getDeal2();
    this.getDeal3();
    this.getNewArrival();
    this.getMainSlider();
    this.getCollections();
    this.getColors();
    this.carouselTile = {
      grid: { xs: 1, sm: 4, md: 4, lg: 4, all: 0 },
      slide: 1,
      point: {
        visible: false
      },
      load: 2,
      touch: true,
      easing: 'ease'
    };
  }
  openLogin() {
    this.ss.getLoginData(true);
  }
  public getMainSlider() {
    this.mainslider.loading = true;
    this.mainslider.error = false;
    this.generalService
      .getRequest('homepageDetails?category=mainSlider')
      .subscribe(
        res => {
          this.mainslider.content = res.responseContents;
          this.mainslider.loading = false;
        },
        e => {
          this.mainslider.loading = false;
          this.mainslider.error = true;
        },
        () => {}
      );
  }

  public getDeal1() {
    this.dealOfTheDay1.loading = true;
    this.dealOfTheDay1.error = false;
    this.generalService.getRequest('homepageDetails?category=deal1').subscribe(
      res => {
        this.dealOfTheDay1.content = res.responseContents;
        this.dealOfTheDay1.loading = false;
      },
      e => {
        this.dealOfTheDay1.loading = false;
        this.dealOfTheDay1.error = true;
      },
      () => {}
    );
  }
  public getDeal2() {
    this.dealOfTheDay2.loading = true;
    this.dealOfTheDay2.error = false;
    this.generalService.getRequest('homepageDetails?category=deal2').subscribe(
      res => {
        this.dealOfTheDay2.content = res.responseContents;
        this.dealOfTheDay2.loading = false;
      },
      e => {
        this.dealOfTheDay2.loading = false;
        this.dealOfTheDay2.error = true;
      },
      () => {}
    );
  }
  public getDeal3() {
    this.dealOfTheDay3.loading = true;
    this.dealOfTheDay3.error = false;
    this.generalService.getRequest('homepageDetails?category=deal3').subscribe(
      res => {
        this.dealOfTheDay3.content = res.responseContents;
        this.dealOfTheDay3.loading = false;
      },
      e => {
        this.dealOfTheDay3.loading = false;
        this.dealOfTheDay3.error = true;
      },
      () => {}
    );
  }

  public getNewArrival() {
    this.newArrival.loading = true;
    this.newArrival.error = false;
    this.generalService
      .getRequest('homepageDetails?category=newArrival')
      .subscribe(
        res => {
          this.newArrival.content = res.responseContents;
          this.newArrival.loading = false;
        },
        e => {
          this.newArrival.loading = false;
          this.newArrival.error = true;
        },
        () => {}
      );
  }
  public getCollections() {
    this.collections.loading = true;
    this.collections.error = false;
    this.generalService
      .getRequest('homepageDetails?category=collections')
      .subscribe(
        res => {
          this.collections.content = res.responseContents;
          this.collections.loading = false;
        },
        e => {
          this.collections.loading = false;
          this.collections.error = true;
        },
        () => {}
      );
  }
  public dealsDetail(id) {
    this.router.navigate(['/product/details', id]);
  }
  public mainSlider(id) {
    this.router.navigate(['/product/', id]);
  }
  public collectionsRedirect(id) {
    this.router.navigate(['/product/', id]);
  }
  public dealsDay(id) {
    this.router.navigate(['/product/details', id]);
  }
  public arivalDetail(id) {
    this.router.navigate(['/product/details', id]);
  }
  public getColors() {
    this.colors.loading = true;
    this.generalService.getRequest1('ListAllProductFilters').subscribe(
      res => {
        this.colors.loading = false;
        const content = res.responseContent.ecommFilterColors;

        this.colors.content = [];
        const n = content.length;
        for (let i = 0; i < n; i = i + 2) {
          const color = [];
          color.push(content[i]);
          if (i + 1 < n) {
            color.push(content[i + 1]);
          }
          this.colors.content.push(color);
        }
      },
      e => {
        this.colors.loading = false;
        this.colors.error = true;
      },
      () => {
        /*alert('login successfull');*/
      }
    );
  }
  setFilterColor(color) {
    this.ss.setColor(color);
    this.ss.changemenuId('Allproduct');
    this.router.navigate(['/product/Allproduct']);
  }
}
