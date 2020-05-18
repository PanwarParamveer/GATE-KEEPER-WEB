import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
// var WiFiControl = require("node_modules/wifi-control/lib/wifi-control.js");


@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  constructor(private toastr: ToastrService,private http : HttpClient) {
  }

  ngOnInit() {
   
    


  }



  
  httpDevice()
  {
    alert("sdf");
    this.http.get("https://192.168.0.102/").subscribe((e)=>{
alert(JSON.stringify(e));
    },err=>{
      alert(JSON.stringify(err));
    });
  }
}
