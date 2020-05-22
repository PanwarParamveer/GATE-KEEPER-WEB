import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';


@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent, ResetPasswordComponent, TermsConditionComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule {
}
