import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  TemplateRef
} from '@angular/core';
import { GeneralService } from '../../general.service';
import { ShowLoadingComponent } from '../../core/show-loading/show-loading.component';
import { SharedService } from '../../shared.service';
import { ToastsManager } from 'ng2-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
  selector: 'app-userprofile-myorder-detail',
  templateUrl: './userprofile-myorder-detail.component.html',
  styleUrls: ['./userprofile-myorder-detail.component.css'],
  providers: [BsModalService]
})
export class UserprofileMyorderDetailComponent implements OnInit {
  userId: any;
  modalRef: BsModalRef;
  public cancelItem = null;
  public orderDetail: any;
  @Input() public itemId: any;
  public currentItem: any = {};
  public cancel: any = [];
  @Output() backEvent = new EventEmitter();

  constructor(
    private orderService: GeneralService,
    private ss: SharedService,
    private toastr: ToastsManager,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.ss.showLoading(true);
    this.getWishlist();
    this.cancelReason();
    this.userId = this.orderService.getUserId();
  }
  cancelReason() {
    this.orderService.getRequest1('cancelReason').subscribe(
      res => {
        this.cancel = res.responseContents;
      },
      e => {},
      () => {}
    );
  }

  public cancelOrder() {
    if (this.cancelItem !== null) {
      this.ss.showLoading(true);
      const reqParam = {
        salesOrderId: this.itemId.salesItemId,
        userId: this.userId,
        cancelReasonId: this.cancelItem
      };
      this.orderService.postRequest1('cancelMyOrder', reqParam).subscribe(
        res => {
          this.ss.showLoading(false);

          if (res.statusCode === 0) {
            this.toastr.success('Your order is cancelled successfully');
            this.backEvent.emit('myorder');
            this.modalRef.hide();
          } else if (res.statusCode === 78121) {
            this.toastr.error(res.errorDescription);
          } else {
            this.toastr.error('Could not cancel your order');
            this.modalRef.hide();
          }
        },
        e => {
          this.ss.showLoading(false);
        },
        () => {}
      );
    }
  }

  Support() {
    this.router.navigate(['/support']);
  }
  getWishlist() {
    this.userId = this.orderService.getUserId();
    const reqParam = this.userId;
    this.orderService.getRequest('myorder?id=' + reqParam).subscribe(
      res => {
        this.orderDetail = res.responseContents;
        const item = this.getDimensions(this.itemId);
        if (item) {
          this.currentItem = item;
        } else {
          this.currentItem = {};
        }
        this.ss.showLoading(false);
      },
      e => {
        this.ss.showLoading(false);
      },
      () => {}
    );
  }

  getDimensions(id) {
    const obj = this.orderDetail.filter(function(node) {
      return node.id === id;
    });
    return obj;
  }

  backToMyorders() {
    this.backEvent.emit('myorder');
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.cancelItem = null;
    this.modalRef.hide();
  }
}
