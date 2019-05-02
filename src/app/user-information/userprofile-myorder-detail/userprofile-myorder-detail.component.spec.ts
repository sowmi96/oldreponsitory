import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofileMyorderDetailComponent } from './userprofile-myorder-detail.component';

describe('UserprofileMyorderDetailComponent', () => {
  let component: UserprofileMyorderDetailComponent;
  let fixture: ComponentFixture<UserprofileMyorderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserprofileMyorderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserprofileMyorderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
