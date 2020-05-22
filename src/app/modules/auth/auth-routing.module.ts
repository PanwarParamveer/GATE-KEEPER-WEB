import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';


const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      {path: '', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'reset-password', component: ResetPasswordComponent},
      {path: 'termsAndConditions', component: TermsConditionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
