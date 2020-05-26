import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from '../../auth/auth-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  // tslint:disable-next-line:variable-name
  updateApi = environment.serviceUrl + '/companyApi/company/update';
  getInfoApi = environment.serviceUrl + '/companyApi/company/companyInfo';
  updateOrgLogoUrl = environment.serviceUrl + '/companyApi/company/updateOrgLogoUrl';
  
  constructor(private http: HttpClient, private fauth: AuthServiceService, private loader: NgxUiLoaderService,
    private toastr: ToastrService,
    private storage: AngularFireStorage
  ) {

  }



  getCompanyDetails() {
    return this.http.post(this.getInfoApi, {}, this.fauth.getHeaders());
  }




  updateCompanyProfile(cDetails: any) {

    return this.http.post(this.updateApi, cDetails, this.fauth.getHeaders());
  }


  updateOrgLogo(file: File) {
    const filePath = '/OrgLogo';
    const fileRef = this.storage.ref(filePath);
var data;

    return new Promise<any>((resolve, reject) => {
      const task = this.storage.upload(filePath, file).then((fle) => {
        data.logoUrl=fle.downloadURL;
       this.http.post(this.updateOrgLogoUrl, data, this.fauth.getHeaders()).subscribe(s => {
          return resolve();
        }, e => {
          return reject(e);
        })

      }).catch((err) => {
        return reject(err);
      });
    })
  }






}
