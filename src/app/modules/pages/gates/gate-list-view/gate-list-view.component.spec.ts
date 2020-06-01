import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GateListViewComponent } from './gate-list-view.component';

describe('GateListViewComponent', () => {
  let component: GateListViewComponent;
  let fixture: ComponentFixture<GateListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GateListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
