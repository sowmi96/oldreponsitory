import { Component, OnInit } from '@angular/core';
import { ReviewsortPipe } from '../../reviewsort.pipe';
import { PageChangedEvent } from 'ngx-bootstrap';
import { SharedService } from '../../shared.service';
import { GeneralService } from '../../general.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { UtilsService } from '../../shared/utils';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  dislikeCount = 0;
  likeCount = 0;
  useridData: string;
  productId: any;
  public sorter = 'one';
  maxSize = 5;
  public reviews: any = [];
  contentArray: any = [];
  returnedArray: any = [];
  public startItem;
  public endItem;
  active = '';

  constructor(
    private ss: SharedService,
    private generalService: GeneralService,
    private route: ActivatedRoute,
    private toastr: ToastsManager,
    private utils: UtilsService
  ) {}

  starme() {
    const el = this;
  }

  Sortdata(x) {
    x = parseInt(x, 10);
    if (x === 1) {
      this.reviews.sort(this.utils.dynamicSort('rating'));
      this.returnedArray = this.reviews.slice(this.startItem, this.endItem);
      // };
    }
    if (x === 5) {
      this.reviews.sort(this.utils.dynamicSort('-rating'));
      this.returnedArray = this.reviews.slice(this.startItem, this.endItem);
    }
  }

  pageChanged(event: PageChangedEvent): void {
    this.startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;

    this.returnedArray = this.reviews.slice(this.startItem, this.endItem);
  }
  public getreview() {
    this.ss.showLoading(true);
    this.generalService
      .getRequest1('productReview?id=' + this.productId)
      .subscribe(
        res => {
          this.ss.showLoading(false);
          this.reviews = res.responseContents;
          this.contentArray = this.reviews;
          this.returnedArray = this.reviews.slice(0, 5);
        },
        e => {
          this.ss.showLoading(false);
        },
        () => {}
      );
  }

  likes(x) {
    const userData = {
      reviewid: x.reviewId,
      userid: this.generalService.getUserId(),
      liketype: true
    };
    this.generalService.postRequest1('postReviewLike', userData).subscribe(
      res => {
        if (this.likeCount === 0) {
          this.likeCount++;
          x.likeCount++;
          if (this.dislikeCount === 1 && x.dislikeCount !== 0) {
            x.dislikeCount--;
            this.dislikeCount--;
          }
        }
      },
      e => {
        this.toastr.error('added failed');
      },
      () => {}
    );
  }
  dislike(x) {
    const userData = {
      reviewid: x.reviewId,
      userid: this.generalService.getUserId(),
      liketype: false
    };
    this.generalService.postRequest1('postReviewLike', userData).subscribe(
      res => {
        if (this.dislikeCount === 0) {
          this.dislikeCount++;
          x.dislikeCount++;
          if (this.likeCount === 1 && x.likeCount !== 0) {
            x.likeCount--;
            this.likeCount--;
          }
        }
      },
      e => {
        this.toastr.error('added failed');
      },
      () => {}
    );
  }

  ngOnInit() {
    this.useridData = this.generalService.getUserId();
    this.route.params.subscribe((params: Params) => {
      this.productId = params['id'];
    });
    this.getreview();
  }
}
