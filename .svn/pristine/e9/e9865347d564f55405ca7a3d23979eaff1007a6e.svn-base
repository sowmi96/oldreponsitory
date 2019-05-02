import { Component, OnInit } from "@angular/core";
import { GeneralService } from "../../../general.service";

@Component({
  selector: "app-quotation",
  templateUrl: "./quotation.component.html",
  styleUrls: ["./quotation.component.css"]
})
export class QuotationComponent implements OnInit {
  public user = window.localStorage.getItem("co-optex-userId");
  public details: any = [];
  public billingAddress: any;
  public deliveryAddress: any;
  public cooptexInfo: any;
  public customerInfo: any;
  public productDetail: any;
  public quotationDetail: any;
  public getSummary: any = [];
  public totalCgst: any;
  public totalSgst: any;
  public totalTax: any;

  constructor(private general: GeneralService) {}

  ngOnInit() {
    this.general.getRequest1("salesQuotesPreview?salesOrderId=850").subscribe(
      res => {
        this.details = res.responseContent;
        this.billingAddress = res.responseContent.billingAddress;
        this.deliveryAddress = res.responseContent.deliveryAddress;
        this.cooptexInfo = res.responseContent.coptexInformation;
        this.customerInfo = res.responseContent.customerInformation;
        this.productDetail = res.responseContent.productDetails;
        this.quotationDetail = res.responseContent;
        this.getSummary = res.responseContent.gstSummary;
        const initialValue = 0;

        // for (let i = 0; i <= this.getSummary.length; i++) {}
        const sum = this.getSummary.reduce(function(accumulator, currentValue) {
          return accumulator + currentValue.cgst;
        }, initialValue);
        const sum1 = this.getSummary.reduce(function(
          accumulator,
          currentValue
        ) {
          return accumulator + currentValue.sgst;
        },
        initialValue);
        const sum2 = this.getSummary.reduce(function(
          accumulator,
          currentValue
        ) {
          return accumulator + currentValue.totalTax;
        },
        initialValue);
        this.totalCgst = sum;
        this.totalSgst = sum1;
        this.totalTax = sum2;
      },
      e => {},
      () => {}
    );
  }

  Printpage() {
    window.print();
  }
}
