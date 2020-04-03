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
  drpUserList: any = {};
  drpDeviceList: any = {};
  constructor(private userService: UserService,
              private loader: NgxUiLoaderService, private deviceService: DeviceService,
              private toastr: ToastrService) { }

  ngOnInit() {

    this.userService.getUserName_Ids().subscribe((s) => {
      this.drpUserList = s;
      $('#userName').select2();
      setTimeout(() => {
        $('#userName').val('ALL').trigger('change');
      }, 100);
    });


    this.deviceService.getListOfDevice().subscribe((s) => {
      this.drpDeviceList = s;
      $('#device').select2();
      setTimeout(() => {
        $('#device').val('ALL').trigger('change');
      }, 100);
    });

  }

}
