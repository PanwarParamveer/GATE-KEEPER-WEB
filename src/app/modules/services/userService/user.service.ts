import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from '../../auth/auth-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  


  private getListofUsers_api = environment.serviceUrl + '/companyApi/company/getListofUsers';
  private getUserDetailsById_api = environment.serviceUrl + '/companyApi/company/getUserDetailsById';

  constructor(private fauth: AuthServiceService,
    private http: HttpClient, private loader: NgxUiLoaderService) { }

  getListOfUsers() {
   return this.http.post(this.getListofUsers_api, {}, this.fauth.getHeaders());
  }


  getUserById(id:string) {
    return this.http.post(this.getUserDetailsById_api, {userId:id}, this.fauth.getHeaders());
  }

}
