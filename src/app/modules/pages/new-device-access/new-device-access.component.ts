import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from '../../services/deviceService/device.service';
import { UserService } from '../../services/userService/user.service';
declare var $;
@Component({
  selector: 'app-new-device-access',
  templateUrl: './new-device-access.component.html',
  styleUrls: ['./new-device-access.component.scss']
})
export class NewDeviceAccessComponent implements OnInit {
  private UserList: any = [];
  private DeviceList: any = [];
  private validIdTypeList: any;
constructor(private deviceService: DeviceService,
            private loader: NgxUiLoaderService,
            private toastr: ToastrService,
            private userService: UserService
            ) { }

ngOnInit() {
  
  this.deviceService.getdrpUserDeviceList().subscribe((data) => {
    this.DeviceList = data.deviceList;
    this.UserList =  data.userList;

    setTimeout(() => {
      $('#drpDeviceList').select2();

      $('#drpUserList').select2();

    }, 100);
  }, (e) => {
    this.toastr.success(e.error, 'Eror');
  });
}


deviceChange() {
  this.validIdTypeList =  this.DeviceList.find(x => x.device_id === $('#drpDeviceList option:selected').val())[0].valid_id_type;

}

creataAccount() {

  this.loader.start();
  this.deviceService.createNewDeviceAccess(
    $('#drpUserList option:selected').val(),
    $('#userdeviceId').val(),
    $('#drpDeviceList option:selected').val(),
    $('#drpDeviceIdType option:selected').val(),
    $('#expiryDate').val()
  ).subscribe((data) => {
    this.toastr.error(data.message, 'Success');
  }, e => {
    this.toastr.error(e.message, 'Error');
    this.loader.stop();
  });

}
}


