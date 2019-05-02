import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofileKntschemRegComponent } from './userprofile-kntschem-reg.component';

describe('UserprofileKntschemRegComponent', () => {
  let component: UserprofileKntschemRegComponent;
  let fixture: ComponentFixture<UserprofileKntschemRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserprofileKntschemRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserprofileKntschemRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
