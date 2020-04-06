import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages/pages.component';
import {DashBoardComponent} from './dash-board/dash-board.component';
import {LayoutModule} from '../layout/layout.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

import { AttendaceComponent } from './attendace/attendace.component';
import { UserViewComponent } from './user-view/user-view.component';
import { MomentModule } from 'ngx-moment';
import { UserDeviceAccessComponent } from './user-device-access/user-device-access.component';
import { UserDeviceAccessViewComponent } from './user-device-access-view/user-device-access-view.component';
import { NewDeviceAccessComponent } from './new-device-access/new-device-access.component';

@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [PagesComponent, DashBoardComponent, MyProfileComponent, CompanyProfileComponent, EmployeeListComponent, AttendaceComponent, UserViewComponent, UserDeviceAccessComponent, UserDeviceAccessViewComponent, NewDeviceAccessComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutModule,
    FormsModule,
    MomentModule
    
  ]
})
export class PagesModule {
}
