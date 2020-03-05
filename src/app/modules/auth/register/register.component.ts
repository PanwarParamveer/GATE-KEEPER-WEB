import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

declare var $;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  authError: any;

  constructor(private auth: AuthServiceService  ) {
  }

  ngOnInit() {
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

  createUser(frm) {
    this.auth.createUser(frm.value);
  }

}
