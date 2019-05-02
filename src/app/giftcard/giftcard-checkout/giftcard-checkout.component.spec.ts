import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftcardCheckoutComponent } from './giftcard-checkout.component';

describe('GiftcardCheckoutComponent', () => {
  let component: GiftcardCheckoutComponent;
  let fixture: ComponentFixture<GiftcardCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftcardCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftcardCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
