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



  }

  ngOnDestroy(): void {
    $('body').removeClass('hold-transition login-page');
  }

  signUpByGoogle() {
    this.auth.signUpByGoogle();
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
    
    if (frm.value.password == '') {
      this.authError = { message: 'Enter Password' };
      return;
    }
    if ($("#term").prop("checked")=== false) {
      this.authError = { message: 'For accessing our services you must agree with our term and condition' };
      return;
    }
    this.auth.createUser(frm.value);
  }



}
