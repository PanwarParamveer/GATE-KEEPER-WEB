import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gate-list-view',
  templateUrl: './gate-list-view.component.html',
  styleUrls: ['./gate-list-view.component.scss']
})
export class GateListViewComponent implements OnInit {
  gateId: string;
  constructor(
    private router: Router,
    private routerParams: ActivatedRoute,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService


  ) { }

  ngOnInit(): void {
    this.gateId = this.routerParams.snapshot.paramMap.get('id');
alert(this.gateId);



  }

}
