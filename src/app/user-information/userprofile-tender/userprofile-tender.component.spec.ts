import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofileTenderComponent } from './userprofile-tender.component';

describe('UserprofileTenderComponent', () => {
  let component: UserprofileTenderComponent;
  let fixture: ComponentFixture<UserprofileTenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserprofileTenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserprofileTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
