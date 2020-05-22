import {Component, OnInit} from '@angular/core';


import { AngularFireAuth } from '@angular/fire/auth';
import { CompanyService } from '../../services/companyService/company.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cDetails: any = {};
   public display_name: string;
   public photo: string;
   public lastLogin:string;
   public email: string;
   public myRole: any;
   
  constructor( private authS: AngularFireAuth, private companyService: CompanyService) {
  }

  ngOnInit() {
    this.display_name = this.authS.auth.currentUser.displayName;
    this.photo = this.authS.auth.currentUser.photoURL;
    this.email = this.authS.auth.currentUser.email;
    this.lastLogin = this.authS.auth.currentUser.metadata.lastSignInTime;
   
    this.authS.auth.currentUser.getIdTokenResult().then(
       (t)=> {  
        this.myRole = t.claims.role;
      }
    );

  }

  logout() {
    this.authS.auth.signOut();
  }
 
  

}
