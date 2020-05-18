import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GK1Component } from './gk1.component';

describe('GK1Component', () => {
  let component: GK1Component;
  let fixture: ComponentFixture<GK1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GK1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GK1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
