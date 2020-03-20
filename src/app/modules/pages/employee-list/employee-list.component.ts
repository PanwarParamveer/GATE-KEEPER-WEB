import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../services/employee.service';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from '../../auth/auth-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/userService/user.service';

declare var $;

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  public usersList: any;
  constructor(private userService: UserService, private loader: NgxUiLoaderService) { }

  ngOnInit() {

    this.loader.start();
    this.userService.getListOfUsers().subscribe(data => {
      this.usersList = data;
      this.loader.stop();
    }, error => {
      alert(error.message);
    }, () => {

      setTimeout(function () {
        $("#example1").DataTable({
          "responsive": true,
          "autoWidth": false,
        });
      }, 300)
      this.loader.stop();

    });


  }

}
