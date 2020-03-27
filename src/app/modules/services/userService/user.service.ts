import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from '../../auth/auth-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IUser } from '../../myInterface/Iuser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  // tslint:disable-next-line:variable-name
  private getListofUsers_api = environment.serviceUrl + '/userApi/user/getListofUsers';
  // tslint:disable-next-line:variable-name
  private getUserDetailsById_api = environment.serviceUrl + '/userApi/user/getUserDetailsById';
  // tslint:disable-next-line:variable-name
  private updateUserDetails_api = environment.serviceUrl + '/userApi/user/updateUserDtl';

  private addNewUserApi = environment.serviceUrl + '/userApi/user/addUser';
  constructor(private fauth: AuthServiceService,
              private http: HttpClient, private loader: NgxUiLoaderService) { }

  getListOfUsers(): Observable<IUser[]> {
   return this.http.post<IUser[]> (this.getListofUsers_api, {}, this.fauth.getHeaders() );
  }


  getUserById(id: string): Observable<IUser> {
    return this.http.post<IUser>(this.getUserDetailsById_api, {userId: id}, this.fauth.getHeaders());
  }


  updateUserDetails(details: any) {
    return this.http.post<string>(this.updateUserDetails_api, details, this.fauth.getHeaders());
  }

  createNewUser(details: any) {
    return this.http.post<string>(this.addNewUserApi, details, this.fauth.getHeaders());
  }

}
