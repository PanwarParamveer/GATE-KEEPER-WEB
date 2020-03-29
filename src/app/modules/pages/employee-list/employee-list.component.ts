import { Component, OnInit } from '@angular/core';


import { NgxUiLoaderService } from 'ngx-ui-loader';

import { UserService } from '../../services/userService/user.service';
import { IUser } from '../../myInterface/Iuser';

declare var $;

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  public usersList: IUser[];
  constructor(private userService: UserService, private loader: NgxUiLoaderService) { }

  ngOnInit() {

    this.loader.start();
    this.userService.getListOfUsers().subscribe(data => {

      // tslint:disable-next-line:no-debugger

      this.usersList = data;

      this.loader.stop();
    }, error => {
      alert(error.message);
    }, () => {
      setTimeout(() => {
        $('#example1').DataTable({
          responsive: true,
          autoWidth: false,
        });
      }, 300);
      this.loader.stop();

    });


  }

}
