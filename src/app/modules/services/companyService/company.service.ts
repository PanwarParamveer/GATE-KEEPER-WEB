import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from '../../auth/auth-service.service';
import { Subject } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CompanyService  {

  // tslint:disable-next-line:variable-name
  updateApi = environment.serviceUrl + '/companyApi/company/update';
  getInfoApi = environment.serviceUrl + '/companyApi/company/companyInfo';
  constructor(private http: HttpClient, private fauth: AuthServiceService, private loader: NgxUiLoaderService,
              private toastr: ToastrService) {

  }



  getCompanyDetails() {
    return this.http.post(this.getInfoApi, {}, this.fauth.getHeaders());
  }




  updateCompanyProfile(cDetails: any) {

    return this.http.post(this.updateApi, cDetails, this.fauth.getHeaders());
  }





}
