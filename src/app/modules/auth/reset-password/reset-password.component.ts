import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

declare var $;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  authError: any;

  constructor(private auth: AuthServiceService) { }

  resetPassword(frm) {
    this.auth.resetPassword(frm.value.email);
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
