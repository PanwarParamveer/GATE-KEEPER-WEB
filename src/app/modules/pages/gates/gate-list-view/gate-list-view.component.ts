import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import {MAT_DIALOG_DATA ,MatDialogRef} from "@angular/material/dialog";
import { GateService } from 'src/app/modules/services/gateService/gate.service';

@Component({
  selector: 'app-gate-list-view',
  templateUrl: './gate-list-view.component.html',
  styleUrls: ['./gate-list-view.component.scss']
})
export class GateListViewComponent implements OnInit {
  gateId: string;
  frmName: string; 
  gateDtl: any = {};
  editMode=false;
  constructor(
    private gateService: GateService ,
 
    private loader: NgxUiLoaderService,
    private msgBox: ToastrService,
    private dialogRef: MatDialogRef<GateListViewComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { 

    this.frmName = data.frmName;
    if(data.data!=''){
      this.gateDtl=data.data; 
      this.editMode=true;
    }
  
  }

  ngOnInit() {
  
}

  save() {
    
    this.loader.start();

    if(this.editMode==false){
    this.gateService.createNewGate(this.gateDtl).subscribe(data=>{      
      this.msgBox.info("Gate created successfully.");
      this.loader.stop();      
      this.dialogRef.close();
    },e=>{
      this.msgBox.error(e.error);
      this.loader.stop();
    }) 
  }
    else{

    
      this.gateService.updateGateDetails(this.gateDtl).subscribe(data=>{      
        this.msgBox.info("Gate details updated successfully.");
        this.loader.stop();      
        this.dialogRef.close();
      },e=>{
        this.msgBox.error(e.error);
        this.loader.stop();
      }) 
    }

}

close() {
    this.dialogRef.close();
}


}
