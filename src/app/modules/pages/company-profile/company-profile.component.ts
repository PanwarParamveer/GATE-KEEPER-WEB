import { Component, OnInit } from '@angular/core';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from '../../auth/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],

})


export class CompanyProfileComponent implements OnInit {
  public cDetails: any = {};
  public editMode = false;
  constructor(
    private fauth: AuthServiceService,
    private http: HttpClient, private loader: NgxUiLoaderService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.getCompanyDetails();
  }

  getCompanyDetails() {

    // tslint:disable-next-line:variable-name
    const url_ = environment.serviceUrl + '/companyApi/company/companyInfo';
    this.http.post(url_, {}, this.fauth.getHeaders()).subscribe((data) => {
      this.cDetails = data;
      this.loader.stop();
    }, (e) => {
      this.toastr.error(e.message, 'Error');
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
    // tslint:disable-next-line:variable-name
    const url_ = environment.serviceUrl + '/companyApi/company/update';
    this.http.post(url_, frm.value, this.fauth.getHeaders()).subscribe(data => {
      this.loader.stop();
      this.editMode = false;
      this.toastr.success( String(data), 'Success');

    } , (e) => {
      this.toastr.error(e.message, 'Error');
      this.loader.stop();
    });
  }
}
