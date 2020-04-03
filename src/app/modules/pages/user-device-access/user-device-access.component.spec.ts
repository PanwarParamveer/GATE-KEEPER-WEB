import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeviceAccessComponent } from './user-device-access.component';

describe('UserDeviceAccessComponent', () => {
  let component: UserDeviceAccessComponent;
  let fixture: ComponentFixture<UserDeviceAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDeviceAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeviceAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
