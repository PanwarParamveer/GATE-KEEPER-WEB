import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GK2Component } from './gk2.component';

describe('GK2Component', () => {
  let component: GK2Component;
  let fixture: ComponentFixture<GK2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GK2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GK2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
