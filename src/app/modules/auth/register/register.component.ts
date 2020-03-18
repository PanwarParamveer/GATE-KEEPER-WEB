import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

declare var $;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  authError: any;
  public Otype: any;
  constructor(private auth: AuthServiceService,

    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.authError='';

    $('body').addClass('hold-transition login-page');
    $(() => {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' /* optional */
      });
    });

    this.auth.eventAuthError$.subscribe(data => {
      this.authError = data;
    });



    // tslint:disable-next-line:variable-name
    const url_ = environment.serviceUrl + '/publicApi/public/typeOfOrganization';
    this.http.get(url_).subscribe(data => {
      this.Otype = data;
    });


  }

  ngOnDestroy(): void {
    $('body').removeClass('hold-transition login-page');
  }

  createUser(frm) {

    if (frm.value.first_name == '') {
      this.authError = { message: 'Enter your first name' };
      return;
    }

    if (frm.value.last_name == '') {
      this.authError = { message: 'Enter your last name' };
      return;
    }

    if (frm.value.email == '') {
      this.authError = { message: 'Invalid email' };
      return;
    }

    if (frm.value.organization_name == '') {
      this.authError = { message: 'Please enter organization name' };
      return;
    }

    if (frm.value.organization_name == 'Organization type') {
      this.authError = { message: 'Please select valid organization type' };
      return;
    }
    

    if (frm.value.organization_type == '') {
      this.authError = { message: 'Please select valid organization type' };
      return;
    }
    if (frm.value.password == '') {
      this.authError = { message: 'Enter Password' };
      return;
    }

    this.auth.createUser(frm.value);
  }



}
