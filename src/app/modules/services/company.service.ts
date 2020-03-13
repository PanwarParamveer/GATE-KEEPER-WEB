import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FirebaseAuth } from '@angular/fire';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private tokenHeader;
  constructor(private firebaseAuth: FirebaseAuth ,  private http: HttpClient,private fun : AngularFireFunctions) {
    
     }

      getCompanyDetails() {

const call =this.fun.httpsCallable("companyApi/company/companyInfo");
   alert(call({}));
        
        // const url =   'http://localhost:5001/userloginaccessmanagementdev/us-central1/companyApi/company/companyInfo ';
        // return this.http.get(url,this.firebaseAuth.currentUser;

      //  return {
      //  name: 'params automation',
      //  logo: 'assets/dist/img/avatar.png',
      //  short_name: 'param',
      //  id: ' ID',
      //  email: ' email',
      //  primary_contact: ' contact',
      //  secondary_contact: ' contact2',
      //  address: ' address',
      //  city: 'city',
      //  state: 'state',
      //  zipcode : '123456'
      // };

    }
}
