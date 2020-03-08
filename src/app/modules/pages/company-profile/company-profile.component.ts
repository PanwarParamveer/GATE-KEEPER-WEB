import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  public   cDetails: any;
  public editMode = false;
   constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.cDetails = this.companyService.getCompanyDetails();
  }

  editMode_click() {
    this.editMode = true;
  }

}
