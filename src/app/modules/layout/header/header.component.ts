import {Component, OnInit} from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { AuthServiceService } from '../../auth/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

   public UserDetails: any;
  constructor(public uDetails: UserServiceService, private auth: AuthServiceService) {
  }

  ngOnInit() {
    this.UserDetails = this.uDetails.getUserDetails();
  }

  logout() {
    alert('logout');
    this.auth.logout();
  }

}
