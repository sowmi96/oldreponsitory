import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofileBulkorderComponent } from './userprofile-bulkorder.component';

describe('UserprofileBulkorderComponent', () => {
  let component: UserprofileBulkorderComponent;
  let fixture: ComponentFixture<UserprofileBulkorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserprofileBulkorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserprofileBulkorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
