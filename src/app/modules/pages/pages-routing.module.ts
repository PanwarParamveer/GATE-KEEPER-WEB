import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PagesComponent} from './pages/pages.component';
import {DashBoardComponent} from './dash-board/dash-board.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { AttendaceComponent } from './attendace/attendace.component';
import { AngularFireAuthGuard, hasCustomClaim, loggedIn, redirectUnauthorizedTo, redirectLoggedInTo  } from "@angular/fire/auth-guard";

// const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
// const redirectLoggedInToItems = () => redirectLoggedInTo(['items']);
// const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);

const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      {path: '', component: DashBoardComponent, canActivateChild: [AngularFireAuthGuard]},

      {path: 'myProfile', component: MyProfileComponent, canActivateChild: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin }},

      {path: 'profile', component: CompanyProfileComponent, canActivateChild: [AngularFireAuthGuard]},
      {path: 'employeeList', component: EmployeeListComponent, canActivateChild: [AngularFireAuthGuard] },
      {path: 'employeeEdit', component: EmployeeEditComponent, canActivateChild: [AngularFireAuthGuard]},
      {path: 'attendance', component: AttendaceComponent, canActivateChild: [AngularFireAuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
