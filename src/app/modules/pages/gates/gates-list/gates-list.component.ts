import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GateService } from 'src/app/modules/services/gateService/gate.service';
import { ToastrService } from 'ngx-toastr';
declare var $;
@Component({
  selector: 'app-gates-list',
  templateUrl: './gates-list.component.html',
  styleUrls: ['./gates-list.component.scss']
})
export class GatesListComponent implements OnInit {
  public gatesList: any;
  constructor(private gateService : GateService, private loader: NgxUiLoaderService,private msgBox: ToastrService) { }

  ngOnInit(): void {

    this.loader.start();
    this.gateService.getListOfGates().subscribe(data => {
      this.gatesList = data;
      this.loader.stop();
    }, error => {
      this.msgBox.error(error.message);
      this.loader.stop();
    }, () => {
      setTimeout(() => {
        $('#tblGateList').DataTable({
          responsive: true,
          autoWidth: false,
        });
      }, 300);
      this.loader.stop();
    });

  }

  deleteGate(gateid: string){
alert(gateid);
  }

}
