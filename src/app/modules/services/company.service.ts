import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable({ 
  providedIn: 'root'
})
export class CompanyService {
  private token: any;

  constructor(private fauth: AuthServiceService, private http: HttpClient) {
   this.token = fauth.getTokenHeader();
  }


  getCompanyDetails() {

    alert(this.token);
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
