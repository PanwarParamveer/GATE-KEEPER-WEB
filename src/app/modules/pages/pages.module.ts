import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages/pages.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LayoutModule } from '../layout/layout.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

import { AttendaceComponent } from './attendace/attendace.component';
import { UserViewComponent } from './user-view/user-view.component';
import { MomentModule } from 'ngx-moment';
import { UserDeviceAccessComponent } from './user-device-access/user-device-access.component';
import { NewDeviceAccessComponent } from './new-device-access/new-device-access.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MyDeviceComponent } from './my-device/my-device.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { GatesListComponent } from './gates/gates-list/gates-list.component';
import { GateListViewComponent } from './gates/gate-list-view/gate-list-view.component';

@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [PagesComponent, DashBoardComponent, MyProfileComponent,
    CompanyProfileComponent, EmployeeListComponent, AttendaceComponent,
    UserViewComponent, UserDeviceAccessComponent,
    NewDeviceAccessComponent, MyDeviceComponent, SubscriptionComponent, GatesListComponent, GateListViewComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutModule,
    FormsModule,
    MomentModule,
    NgSelectModule,
    ReactiveFormsModule
    
  ]
})
export class PagesModule {
}
