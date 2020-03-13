import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({ 
  providedIn: 'root'
})
export class CompanyService {
  private token: string;
   
  constructor(private fauth: AngularFireAuth , private http: HttpClient) {
     this.fauth.auth.currentUser.getIdToken()
    .then(token => {
      this.token= token.toString();
     
    }).catch((e) => {
      return '';
    });



  }


  getCompanyDetails() {

    const httpOptions = {
 headers: new HttpHeaders({
   'Content-Type':  'application/json',
   authorization: 'Bearer ' + this.token
 })
};

    const data = {name: 'Dale Nguyen'};

    // tslint:disable-next-line:variable-name
    const url_ = environment.serviceUrl + '/companyApi/company/companyInfo';

    return this.http.post(url_, data, httpOptions);

}

}
