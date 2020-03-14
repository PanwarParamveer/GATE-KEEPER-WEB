import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private token: string;

  constructor(private fauth: AuthServiceService, private http: HttpClient) {  }

   getCompanyDetails() {
    const data = { name: 'Dale Nguyen' };
    // tslint:disable-next-line:variable-name
    const url_ = environment.serviceUrl + '/companyApi/company/companyInfo';
    return this.http.post(url_, data, this.fauth.getHeaders());
  }


  getOrganizationType() {
    // tslint:disable-next-line:variable-name
    const url_ = environment.serviceUrl + '/publicApi/public/typeOfOrganization';
    return this.http.get(url_);
  }

 

}
