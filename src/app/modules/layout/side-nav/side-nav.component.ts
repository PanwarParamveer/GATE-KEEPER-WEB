import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from '../../services/companyService/company.service';


declare var $;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  cDetails: any = {};

  constructor(private http: HttpClient, private fauth: AuthServiceService, private companyService: CompanyService) {

  }

  ngOnInit() {
    $(document).ready(() => {
      $('.sidebar-menu').tree();
    });


    this.companyService.getCompanyDetails().subscribe((data) => {
      this.cDetails = data;
    });

  }




}
