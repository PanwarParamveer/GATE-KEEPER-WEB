import { Component, OnInit, Inject } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from '../../services/deviceService/device.service';
import { UserService } from '../../services/userService/user.service';
import { NgOption } from '@ng-select/ng-select';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import { GateService } from '../../services/gateService/gate.service';
declare var $;
@Component({
  selector: 'app-new-device-access',
  templateUrl: './new-device-access.component.html',
  styleUrls: ['./new-device-access.component.scss']
})
export class NewDeviceAccessComponent implements OnInit {
  selectedUser = new FormControl();
  userList: any = {};
  selectedGate = new FormControl();
  gateList: any = {};
  gateAccessDtl:any={};
  editMode:boolean;

  
  
  frmName: string;

  constructor(private GateService: GateService,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService,
    private userService: UserService,
    private dialogRef: MatDialogRef<NewDeviceAccessComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.frmName = data.frmName;
    if(data.data!=''){
      this.gateAccessDtl=data.data; 
      this.editMode=true;
    }

  }

  ngOnInit() {

    

    this.GateService.getActiveUserAndGates().subscribe((data:any) => {
      this.gateList = data.gateList;
      this.userList = data.userList;
    }, (e) => {
      this.toastr.success(e.error, 'Eror');
    });



  }

  creataAccount() {

    this.loader.start();
    this.GateService.createNewGateAccess(this.gateAccessDtl).subscribe((data: any) => {
      this.loader.stop();
      this.toastr.success(data.message, 'Success'); 
      this.dialogRef.close(true); 
    }, e => {
      this.loader.stop();
      this.toastr.error(e.error, 'Error');
    });

  }

  close() {
    this.dialogRef.close(false);
}



}


