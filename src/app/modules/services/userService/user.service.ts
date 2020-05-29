import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from '../../auth/auth-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IUser } from '../../myInterface/Iuser';
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
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

  private getListofUsersNameIds = environment.serviceUrl + '/userApi/user/getListofUsersNameIds';

  private getUserAttendance = environment.serviceUrl + '/userApi/user/getUserAttendance';

  private updateUserPicUrl = environment.serviceUrl + '/userApi/user/updateUserPicUrl';

  constructor(private fauth: AuthServiceService, private authS: AngularFireAuth,
    private http: HttpClient, private loader: NgxUiLoaderService, private storage: AngularFireStorage) { }

  updateProfilePhoto(file: any, userId: any) {




    return new Promise<any>((resolve, reject) => {
      this.authS.auth.currentUser.getIdTokenResult().then(
        (t) => {
      
          const filePath = t.claims.company_id + '/user_profile_pic/' + userId;
          const fileRef = this.storage.ref(filePath);
          const task = this.storage.upload(filePath, file).then((fle) => {
            var fileUrl = fileRef.getDownloadURL().subscribe((url) => {
              this.http.post(this.updateUserPicUrl, { profilePhoto: url, userSysId: userId }, this.fauth.getHeaders()).subscribe(s => {
                return resolve();
              }, e => {
                return reject(e);
              })
            });

          }).catch((err) => {
            return reject(err);
          });

        });
    });
  }

  getListOfUsers(): Observable<IUser[]> {
    return this.http.post<IUser[]>(this.getListofUsers_api, {}, this.fauth.getHeaders());
  }


  getUserById(id: string): Observable<IUser> {
    return this.http.post<IUser>(this.getUserDetailsById_api, { userId: id }, this.fauth.getHeaders());
  }

  getUserName_Ids() {
    return this.http.post<IUser>(this.getListofUsersNameIds, {}, this.fauth.getHeaders());
  }

  getUsersAttendance(data: any) {
    return this.http.post(this.getUserAttendance, data, this.fauth.getHeaders());
  }



  updateUserDetails(details: any) {
    return this.http.post<string>(this.updateUserDetails_api, details, this.fauth.getHeaders());
  }

  createNewUser(details: any) {
    return this.http.post<string>(this.addNewUserApi, details, this.fauth.getHeaders());
  }

}
