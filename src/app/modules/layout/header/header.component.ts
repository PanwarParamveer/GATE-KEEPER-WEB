import {Component, OnInit} from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

   public UserDetails: any;
  constructor(public uDetails: UserServiceService) {
  }

  ngOnInit() {
    this.UserDetails=this.uDetails.getUserDetails();
  }

}
