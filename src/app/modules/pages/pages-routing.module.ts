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
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
// const redirectLoggedInToItems = () => redirectLoggedInTo(['items']);
// const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);

const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      {path: '', component: DashBoardComponent, canActivate: [AngularFireAuthGuard],
       data: { authGuardPipe: redirectUnauthorizedToLogin }},

      {path: 'myProfile', component: MyProfileComponent, canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin }},

      {path: 'profile', component: CompanyProfileComponent, canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin }
    },
      {path: 'employeeList', component: EmployeeListComponent, canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin }
    },
      {path: 'employeeEdit', component: EmployeeEditComponent, canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin }
    },
      {path: 'attendance', component: AttendaceComponent, canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin }
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
