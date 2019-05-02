import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofileMyorderComponent } from './userprofile-myorder.component';

describe('UserprofileMyorderComponent', () => {
  let component: UserprofileMyorderComponent;
  let fixture: ComponentFixture<UserprofileMyorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserprofileMyorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserprofileMyorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
