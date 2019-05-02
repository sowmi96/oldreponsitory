import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofileCareerComponent } from './userprofile-career.component';

describe('UserprofileCareerComponent', () => {
  let component: UserprofileCareerComponent;
  let fixture: ComponentFixture<UserprofileCareerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserprofileCareerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserprofileCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
