import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDeviceAccessComponent } from './new-device-access.component';

describe('NewDeviceAccessComponent', () => {
  let component: NewDeviceAccessComponent;
  let fixture: ComponentFixture<NewDeviceAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDeviceAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDeviceAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
