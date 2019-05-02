import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerLoginComponent } from './career-login.component';

describe('CareerLoginComponent', () => {
  let component: CareerLoginComponent;
  let fixture: ComponentFixture<CareerLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
