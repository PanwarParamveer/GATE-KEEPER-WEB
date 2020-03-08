import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(public http :HttpClient) {

     }

     public getCompanyDetails() {

       
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
