import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderLoginComponent } from './tender-login.component';

describe('TenderLoginComponent', () => {
  let component: TenderLoginComponent;
  let fixture: ComponentFixture<TenderLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
