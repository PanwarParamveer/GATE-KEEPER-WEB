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
  constructor(private gateService : GateService, 
    private loader: NgxUiLoaderService,
    private msgBox: ToastrService) { }

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
          autoWidth: true,
        });
      }, 300);
      this.loader.stop();
    });

  }

  deleteGate(gateid: string){
    this.loader.start();
    this.gateService.deleteGate(gateid).subscribe(data=>{      
      this.msgBox.info("Gate Deleted successfully.");
      this.gatesList.forEach(el=>{
        if (el.id == gateid) {
          this.loader.stop();
          this.gatesList.splice(this.gatesList.indexOf(el), 1);
       return;
        }
      });
      
    },e=>{
      this.msgBox.error("Something went wrong!! Unable to delete gate.");
      this.loader.stop();
    })  
  }

  openGateEditComponent(id){
    this.gateService.openGateEditComponent(id).afterClosed().subscribe(cl=>{
        
    this.gateService.getListOfGates().subscribe(data => {
      this.gatesList = data;
      
    }, error => {
      this.msgBox.error(error.message);
     
    }, () => {
      $('#tblGateList').DataTable().destroy();
      setTimeout(() => {
        $('#tblGateList').DataTable({
          responsive: true,
          autoWidth: true,
        });
      }, 300);
    
    });

    });
  }

}
