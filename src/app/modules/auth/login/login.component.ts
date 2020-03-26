import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {


  authError: any;

  constructor(private auth: AuthServiceService) { }

  login(frm) {
    this.auth.login(frm.value.email, frm.value.password);
  }




  ngOnInit() {
    this.authError = '';
    $('body').addClass('hold-transition login-page');
    $(() => {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' /* optional */
      });
    });

    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
    });

  }

  ngOnDestroy(): void {
    $('body').removeClass('hold-transition login-page');
  }

}
