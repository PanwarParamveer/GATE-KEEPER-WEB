import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from '../../services/deviceService/device.service';
import { UserService } from '../../services/userService/user.service';
import { NgOption } from '@ng-select/ng-select';
declare var $;
@Component({
  selector: 'app-new-device-access',
  templateUrl: './new-device-access.component.html',
  styleUrls: ['./new-device-access.component.scss']
})
export class NewDeviceAccessComponent implements OnInit {



  selectedUser: any = {};
  selectedDevice: any = {};
  selectedIDType: any = {};
  expiryDate: string;
  userdeviceId: string;
  UserList: any = {};
  DeviceList: any = {};

  constructor(private deviceService: DeviceService,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService,
    private userService: UserService
  ) { }


  ngOnInit() {

    this.deviceService.getdrpUserDeviceList().subscribe((data) => {
      this.DeviceList = data.deviceList;
      this.UserList = data.userList;

    }, (e) => {
      this.toastr.success(e.error, 'Eror');
    });

  }


  creataAccount() {

    this.loader.start();
    this.deviceService.createNewDeviceAccess(
      this.selectedUser,
      this.userdeviceId,
      this.selectedDevice.device_id,
      this.selectedIDType,
      this.expiryDate
    ).subscribe((data) => {
      this.loader.stop();
      this.toastr.success(data.message, 'Success');
      this.selectedUser = {};
      this.selectedDevice = {};
      this.selectedIDType = {};
      this.expiryDate = '';
      this.userdeviceId = '';
    }, e => {
      this.loader.stop();
      this.toastr.error(e.error, 'Error');
    });

  }
}


