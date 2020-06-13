import { Injectable } from '@angular/core';
import { AuthServiceService } from '../../auth/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { GateListViewComponent } from '../../pages/gates/gate-list-view/gate-list-view.component';
import { NewDeviceAccessComponent } from '../../pages/new-device-access/new-device-access.component';

@Injectable({
  providedIn: 'root'
})



export class GateService {
 
  private gateListapi = environment.serviceUrl + '/gateApi/gateList';
  private newGateapi = environment.serviceUrl + '/gateApi/newGate';
  private updateGateapi = environment.serviceUrl + '/gateApi/UpdateGate';
  private deleteGateapi = environment.serviceUrl + '/gateApi/deleteGate';
  private createNewGateAccessapi = environment.serviceUrl + '/gateApi/createNewGateAccess';
  private getActiveUserAndGatesapi = environment.serviceUrl + '/gateApi/getActiveUserAndGates';
  private getUserAccessListapi = environment.serviceUrl + '/gateApi/getUserAccessList';
  private deleteGateAccessapi = environment.serviceUrl + '/gateApi/deleteGateAccess';
  

  constructor(private fauth: AuthServiceService,private http: HttpClient, private dialog: MatDialog) { }

  getListOfGates() {
    return this.http.post(this.gateListapi,{}, this.fauth.getHeaders());   
  }

  deleteGateAccess(Accessid: string) {
    return this.http.post(this.deleteGateAccessapi,{gateAccessId:Accessid}, this.fauth.getHeaders());
  }  

  getActiveUserAndGates() {
    return this.http.post(this.getActiveUserAndGatesapi,{}, this.fauth.getHeaders());   
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
      'top': '105px' 
  };
  dialogConfig.maxWidth="100vw";
  
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    
    dialogConfig.data = {
        data: ('id' in gateData) ? gateData:null ,
        frmName:   ('id' in gateData) ? 'Edit Gate Details' : 'Create New Gate'
    };

    // this.dialog.open(GateListViewComponent, dialogConfig);
  
   return this.dialog.open(GateListViewComponent, dialogConfig);

  }


  openGateAccessViewComponent(gateAccessData: any) {
  
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {
      'top': '105px'  
  };
  dialogConfig.maxWidth="100vw";
  
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    
    dialogConfig.data = {
        data: gateAccessData ,
        frmName:  gateAccessData=='' ? 'Create New Gate Access' :'Edit Gate Access Details'
    };

    return  this.dialog.open(NewDeviceAccessComponent, dialogConfig);
  
  }


  createNewGateAccess(accessData:any){
    return this.http.post(this.createNewGateAccessapi,accessData, this.fauth.getHeaders());
  }


  getUserAccessList(){
    return this.http.post(this.getUserAccessListapi,{}, this.fauth.getHeaders());
  }

}
