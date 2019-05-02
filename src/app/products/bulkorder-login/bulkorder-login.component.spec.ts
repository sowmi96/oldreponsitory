import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkorderLoginComponent } from './bulkorder-login.component';

describe('BulkorderLoginComponent', () => {
  let component: BulkorderLoginComponent;
  let fixture: ComponentFixture<BulkorderLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkorderLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkorderLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
