import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
public cDetails :any={} 

  constructor(private routerParams: ActivatedRoute) { }

   userId :any;

  ngOnInit() {
    this.userId  = this.routerParams.data.pipe(map(d => d.id));
alert(  this.userId );
  }

}
