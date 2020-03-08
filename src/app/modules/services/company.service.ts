import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() {

     }

     getCompanyDetails() {
       //return this.http.get('http://localhost:5001/userloginaccessmanagementdev/us-central1/companyApi/company/companyInfo');

       return {
       name: 'params automation',
       logo: 'assets/dist/img/avatar.png',
       short_name: 'param',
       id: ' ID',
       email: ' email',
       primary_contact: ' contact',
       secondary_contact: ' contact2',
       address: ' address',
       city: 'city',
       state: 'state',
       zipcode : '123456'
      };

    }
}
