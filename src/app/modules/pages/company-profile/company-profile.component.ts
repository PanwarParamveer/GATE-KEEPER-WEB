import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  public   cDetails: any;
  public editMode = false;
   constructor(private companyService: CompanyService, private loader :NgxUiLoaderService) { }

  ngOnInit() {
    this.cDetails = this.companyService.getCompanyDetails()
    .subscribe((retDATa) => {
      this.cDetails = retDATa;
    });
  }

  editMode_click() {
    this.editMode = true;
  }
  cancel_click() {

    this.editMode = false;
  }

update(frm){
  this.loader.start();
this.companyService.upate(frm.value).subscribe((retDATa) => {
  
  this.loader.stop();  
    this.editMode = false;
});
}


}
