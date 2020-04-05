import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeviceAccessViewComponent } from './user-device-access-view.component';

describe('UserDeviceAccessViewComponent', () => {
  let component: UserDeviceAccessViewComponent;
  let fixture: ComponentFixture<UserDeviceAccessViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDeviceAccessViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeviceAccessViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
