import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KntSchemeLoginComponent } from './knt-scheme-login.component';

describe('KntSchemeLoginComponent', () => {
  let component: KntSchemeLoginComponent;
  let fixture: ComponentFixture<KntSchemeLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KntSchemeLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KntSchemeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
