import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from '../../services/companyService/company.service';
import { AngularFireAuth } from '@angular/fire/auth';


declare var $;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {


  // tslint:disable-next-line:variable-name
  public display_name: string;
  public photo: string;
  public myRole: any;
  constructor( private authS: AngularFireAuth) {

  }

  ngOnInit() {
    $(document).ready(() => {
      $('.sidebar-menu').tree();
    });


    this.display_name = this.authS.auth.currentUser.displayName;
    this.photo = this.authS.auth.currentUser.photoURL;
    this.authS.auth.currentUser.getIdTokenResult().then(
       (t) => {
        this.myRole = t.claims.role;
      }
    );

}




}
