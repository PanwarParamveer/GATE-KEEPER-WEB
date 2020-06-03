import { Injectable } from '@angular/core';
import { AuthServiceService } from '../../auth/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { GateListViewComponent } from '../../pages/gates/gate-list-view/gate-list-view.component';

@Injectable({
  providedIn: 'root'
})

export class GateService {  
  private gateListapi = environment.serviceUrl + '/gateApi/gateList';
  private newGateapi = environment.serviceUrl + '/gateApi/newGate';
  private updateGateapi = environment.serviceUrl + '/gateApi/UpdateGate';
  private deleteGateapi = environment.serviceUrl + '/gateApi/deleteGate';

  constructor(private fauth: AuthServiceService,private http: HttpClient, private dialog: MatDialog) { }

  getListOfGates() {
    return this.http.post(this.gateListapi,{}, this.fauth.getHeaders());   
  }

  
  createNewGate(data: any) {
    return this.http.post(this.newGateapi,data, this.fauth.getHeaders());   
  }

updateGateDetails(data: any){
  return this.http.post(this.updateGateapi,data, this.fauth.getHeaders());  
}

deleteGate(gateid:string){
  return this.http.post(this.deleteGateapi,{gateId:gateid}, this.fauth.getHeaders());  
}

openGateEditComponent(gateData: any) {
  
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      'top': '5%'
     
  };


    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    
    dialogConfig.data = {
        data: gateData ,
        frmName:  gateData=='' ? 'Create New Gate' :'Edit Gate Details'
    };

    // this.dialog.open(GateListViewComponent, dialogConfig);
  
   return this.dialog.open(GateListViewComponent, dialogConfig);

  }

}
