import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';


declare var $;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  cDetails: any = {};

  constructor(private http: HttpClient, private fauth: AuthServiceService, private loader: NgxUiLoaderService) {

  }

  ngOnInit() {
    $(document).ready(() => {
      $('.sidebar-menu').tree();
    });
    this.getCompanyDetails();
  }


  getCompanyDetails() {
    this.loader.start();
    const url_ = environment.serviceUrl + '/companyApi/company/companyInfo';
    this.http.post(url_, {}, this.fauth.getHeaders()).subscribe((data) => {
      this.cDetails = data;
      this.loader.stop();
    });
  }

}
