import {Component, OnInit} from '@angular/core';
import { AuthServiceService } from '../../auth/auth-service.service';
import { CompanyService } from '../../services/company.service';

declare var $;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

   public   cDetails: any;

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
    $(document).ready(() => {
      $('.sidebar-menu').tree();
    });

    this.cDetails =  this.companyService.getCompanyDetails().subscribe((retDATa) => {
      this.cDetails = retDATa;
    });
  }

}
