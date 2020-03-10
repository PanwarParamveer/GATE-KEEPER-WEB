import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

public getEmployeeList(){

  var j=[{emp_id:'123',first_name:'Paramveer',last_name:'Panwar',middle_name:'Uttamsingh',department:'IT',status:'Active'}
,{emp_id:'123',first_name:'Paramveer',last_name:'Panwar',middle_name:'Uttamsingh',department:'IT',status:'Active'}
,{emp_id:'123',first_name:'Paramveer',last_name:'Panwar',middle_name:'Uttamsingh',department:'IT',status:'Active'}

  ];

  return j;

}

}
