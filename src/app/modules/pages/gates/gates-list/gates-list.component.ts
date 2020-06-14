import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GateService } from 'src/app/modules/services/gateService/gate.service';
import { ToastrService } from 'ngx-toastr';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
declare var $;
@Component({
  selector: 'app-gates-list',
  templateUrl: './gates-list.component.html',
  styleUrls: ['./gates-list.component.scss']
})
export class GatesListComponent implements OnInit {
  public gatesList: any;
  constructor(private gateService : GateService, private coolDialogs: NgxCoolDialogsService,
    private loader: NgxUiLoaderService,
    private msgBox: ToastrService) { }

  ngOnInit(): void {
   
    this.loader.start();
    this.gateService.getListOfGates().subscribe(data => {
      this.gatesList = data;
      this.loader.stop();
    }, error => {
      this.msgBox.error(error.message,)
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

// Confirm
this.coolDialogs.confirm('Are you sure you want to delete this gate ?  Note: All associated user access will be deleted immediatly.',{
 
  okButtonText: 'Yes,Delete',
  cancelButtonText: 'Cancel',
  color: 'red',
  title: 'Delete Gate'
})
  .subscribe(res => {
    if (res) {
     
    this.loader.start();
    this.gateService.deleteGate(gateid).subscribe(data=>{      
      this.msgBox.info("Gate Deleted successfully with user access.");
      this.gatesList.forEach(el=>{
        if (el.id == gateid) {
          this.loader.stop();
          this.gatesList.splice(this.gatesList.indexOf(el), 1);
       return;
        }
      });
      
    },e=>{
      this.msgBox.error("Something went wrong while deleting gate.");
      this.loader.stop();
    })  

  } 
});
  }

  openGateEditComponent(gateDtl){
    var dataToModify= Object.assign({}, gateDtl);
    
    this.gateService.openGateEditComponent(dataToModify).afterClosed().subscribe(cl=>{
        if(cl===false){
          return;
        }
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
