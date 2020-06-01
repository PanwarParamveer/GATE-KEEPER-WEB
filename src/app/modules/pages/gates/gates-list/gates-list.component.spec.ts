import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatesListComponent } from './gates-list.component';

describe('GatesListComponent', () => {
  let component: GatesListComponent;
  let fixture: ComponentFixture<GatesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
