import { Component, OnInit } from '@angular/core';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from '../../auth/auth-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  public cDetails: any = {};
  public editMode = false;
  constructor(
    private fauth: AuthServiceService,
    private http: HttpClient, private loader: NgxUiLoaderService) { }

  ngOnInit() {
    this.getCompanyDetails();    
  }

  getCompanyDetails() {
  
    const url_ = environment.serviceUrl + '/companyApi/company/companyInfo';
      this.http.post(url_,{}, this.fauth.getHeaders()).subscribe((data)=>{
        this.cDetails =data;             
      this.loader.stop();
      });
}

  editMode_click() {
    this.editMode = true;
  }
  cancel_click() {
    this.editMode = false;
  }

  update(frm) {
    this.loader.start();
    const url_ = environment.serviceUrl + '/companyApi/company/update';
    this.http.post(url_, frm.value, this.fauth.getHeaders()).subscribe(data => {
      this.loader.stop();
      this.editMode = false;
    });
  }
}
