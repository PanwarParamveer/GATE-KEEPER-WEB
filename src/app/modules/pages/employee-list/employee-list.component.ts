import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../services/employee.service';
declare var $;

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  constructor(private emps : EmployeeService) { }
public empList : any;
  ngOnInit() {

  this.empList= this.emps.getEmployeeList();

    $(function () {
      

this.empList= this.emps.

      $('#example1').DataTable();
      

      
    })
  

  }

}
