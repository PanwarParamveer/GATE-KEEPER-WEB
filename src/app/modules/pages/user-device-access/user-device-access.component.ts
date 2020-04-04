import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../../services/userService/user.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from '../../services/deviceService/device.service';
declare var $;
@Component({
  selector: 'app-user-device-access',
  templateUrl: './user-device-access.component.html',
  styleUrls: ['./user-device-access.component.scss']
})
export class UserDeviceAccessComponent implements OnInit {
  sDetails: any = {};
  UserList: any = {};
  DeviceList: any = {};
  userDeviceAccessList: any = {};
  constructor(private userService: UserService,
              private loader: NgxUiLoaderService, private deviceService: DeviceService,
              private toastr: ToastrService) { }

  ngOnInit() {

    this.userService.getUserName_Ids().subscribe((s) => {
      this.UserList = s;
      $('#userName').select2();
      setTimeout(() => {
        $('#drpUserList').val('ALL').trigger('change');
      }, 100);
    });


    this.deviceService.getListOfDevice().subscribe((s) => {
      this.DeviceList = s;
      $('#device').select2();
      setTimeout(() => {
        $('#drpDeviceList').val('ALL').trigger('change');
      }, 100);
    }, (e) => {
      this.toastr.success(e.message, 'Eror');
    });

    // this.loader.start();
    // this.sDetails.device_id = this.sDetails.user_sys_id = $('#drpDeviceList option:selected').val();
    // this.sDetails.user_sys_id = this.sDetails.user_sys_id = $('#drpUserList option:selected').val();
    // this.deviceService.getDeviceAccess(this.sDetails).subscribe((s) => {
    //   this.userDeviceAccessList = s;
    //   this.loader.stop();

    // }, (e) => {
    //   this.toastr.success(e.message, 'Eror');
    //   this.loader.stop();
    // });


  }


  onSubmit() {

    this.loader.start();
    this.sDetails.device_id = this.sDetails.user_sys_id = $('#drpDeviceList option:selected').val();
    this.sDetails.user_sys_id = this.sDetails.user_sys_id = $('#drpUserList option:selected').val();
    // tslint:disable-next-line:max-line-length
    this.deviceService.getDeviceAccess(this.sDetails).subscribe((data) => {
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
