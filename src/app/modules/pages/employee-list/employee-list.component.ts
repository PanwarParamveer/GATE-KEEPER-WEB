import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../services/employee.service';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from '../../auth/auth-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';

declare var $;

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  public usersList: any;
  constructor(private fauth: AuthServiceService,
    private http: HttpClient, private loader: NgxUiLoaderService) { }

  ngOnInit() {
    const url_ = environment.serviceUrl + '/companyApi/company/getListofUsers';
    this.loader.start();
    this.http.post(url_, {}, this.fauth.getHeaders()).subscribe((data) => {
      this.usersList = data;
      this.loader.stop();


      setTimeout(function () {
        $("#example1").DataTable({
          "responsive": true,
          "autoWidth": false,
        });
      }, 1000)

    });





  }

}
