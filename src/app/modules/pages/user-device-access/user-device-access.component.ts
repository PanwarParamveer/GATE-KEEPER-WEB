import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../../services/userService/user.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from '../../services/deviceService/device.service';
import { NgOption } from '@ng-select/ng-select';
declare var $;
@Component({
  selector: 'app-user-device-access',
  templateUrl: './user-device-access.component.html',
  styleUrls: ['./user-device-access.component.scss']
})
export class UserDeviceAccessComponent implements OnInit {

  selectedUser: any = {};
  selectedDevice: any = {};

  UserList: any = [];
  DeviceList: any = [];
  userDeviceAccessList: any = {};



  constructor(private userService: UserService, private loader: NgxUiLoaderService, private deviceService: DeviceService,
    private toastr: ToastrService) { }

  ngOnInit() {

    this.deviceService.getdrpUserDeviceList().subscribe((data) => {

      this.UserList = data.userList;
      this.UserList.unshift({ user_name: 'ALL', user_sys_id: 'ALL' });


      this.DeviceList = data.deviceList;
      this.DeviceList.unshift({ device_name: 'ALL', device_id: 'ALL' });


      this.selectedUser = this.UserList[0];
      this.selectedDevice = this.DeviceList[0];
      
    }, (e) => {
      this.toastr.success(e.error, 'Eror');
    });
  }


  onSubmit() {

    this.loader.start();
    // tslint:disable-next-line:max-line-length
    this.deviceService.getDeviceAccess({ device_id: this.selectedDevice.device_id, user_sys_id: this.selectedUser.user_sys_id }).subscribe((data) => {
      $('#example1').DataTable().destroy();
      this.userDeviceAccessList = data;
      setTimeout(() => {
        $('#example1').DataTable({
          responsive: true,
          autoWidth: false,
        });
      }, 100);
      this.loader.stop();
    }, e => {
      this.toastr.warning(e.error, 'Error');
      this.loader.stop();
    });
  }

}
