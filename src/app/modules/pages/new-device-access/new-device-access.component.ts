import { Component, OnInit, Inject } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from '../../services/deviceService/device.service';
import { UserService } from '../../services/userService/user.service';
import { NgOption } from '@ng-select/ng-select';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
declare var $;
@Component({
  selector: 'app-new-device-access',
  templateUrl: './new-device-access.component.html',
  styleUrls: ['./new-device-access.component.scss']
})
export class NewDeviceAccessComponent implements OnInit {



  selectedUser: any = {};
  selectedDevice: any = {};
  expiryDate = '';
  UserList: any = {};
  DeviceList: any = {};
  gateAccessDtl:any;
  editMode:boolean;

  toppings = new FormControl();
  toppingList:any;
  frmName: string;

  constructor(private deviceService: DeviceService,
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

    

    this.deviceService.getdrpUserDeviceList().subscribe((data) => {
      this.DeviceList = data.deviceList;
      this.UserList = data.userList;
    }, (e) => {
      this.toastr.success(e.error, 'Eror');
    });



  this.toppingList  = ['1','2','3','4','5','6','7','1','2','3','4','5','6','7','Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Toaaaato', 'Tomato'];


  }


  creataAccount() {

    this.loader.start();
    this.deviceService.createNewDeviceAccess(this.selectedUser, this.selectedDevice.device_id, this.expiryDate).subscribe((data) => {
      this.loader.stop();
      this.toastr.success(data.message, 'Success');
      this.selectedUser = {};
      this.selectedDevice = {};
      this.expiryDate = '';
    }, e => {
      this.loader.stop();
      this.toastr.error(e.error, 'Error');
    });

  }

  close() {
    this.dialogRef.close();
}



}


