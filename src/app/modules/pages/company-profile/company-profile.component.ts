import { Component, OnInit } from '@angular/core';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from '../../auth/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgOption } from '@ng-select/ng-select';
import { CompanyService } from '../../services/companyService/company.service';

declare var $;

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],

})

export class CompanyProfileComponent implements OnInit {
  public cDetails: any = {};
  public editMode = false;
 isImageSelected=false;
  constructor(
    private fauth: AuthServiceService,
    private http: HttpClient, private loader: NgxUiLoaderService,
    private toastr: ToastrService,
    private orgService: CompanyService
    ) { }

  ngOnInit() {
    this.getCompanyDetails();
  }

  
  ImageSelected($event) {
    if ($event.target.files && $event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#imagePreview').css('background-image', 'url('+e.target.result +')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
            

        }
        this.isImageSelected=true;
        reader.readAsDataURL($event.target.files[0]);
    }
}

updateLogo(){
  this.loader.start();
  var file = $('#imageUpload')[0].files[0];
  this.orgService.updateOrgLogo(file).then(s=>{
    this.toastr.success(s, 'Updated');
    this.loader.stop();
  }).catch(err=>{
    this.toastr.error(err.message, 'Error');
      this.loader.stop();
  });
}

  
  getCompanyDetails() {
    this.loader.start();
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

  onSubmit(frm) {
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
