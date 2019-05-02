import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../../general.service';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  menuData: any = [];
  footerToggle = [true, false, false, false];
  public resizeFunction() {
    if (window.screen.width > 768) {
      this.footerToggle = [true, true, true, true];
    } else {
      this.footerToggle = [true, false, false, false];
    }
  }

  constructor(
    private generalService: GeneralService,
    private elRef: ElementRef,
    private ss: SharedService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getMenuList();
    this.resizeFunction();
  }

  public informationClick() {
    window.scroll(0, 0);
  }
  public showProducts(id) {
    this.informationClick();
    this.ss.changemenuId(id);
    this.router.navigate(['/product', id]);
  }
  public getMenuList() {
    this.generalService.getRequest('AllMenuItems').subscribe(
      res => {
        const data = res;
        if (data) {
          data.map(element => {
            element.subMenu.map(menu => {
              this.menuData.push(menu);
            });
          });
        }
      },
      e => {},
      () => {}
    );
  }

  accordionClick(id) {
    if (window.screen.width < 768) {
      this.footerToggle[id] = !this.footerToggle[id];
    }
  }
}
