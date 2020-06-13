import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DeviceService } from '../../services/deviceService/device.service';
import { ToastrService } from 'ngx-toastr';
declare var $;
@Component({
  selector: 'app-my-device',
  templateUrl: './my-device.component.html',
  styleUrls: ['./my-device.component.scss']
})
export class MyDeviceComponent implements OnInit {

  myDevice: any = {};
  constructor(private loader: NgxUiLoaderService, private deviceService: DeviceService,private toastr: ToastrService) { }


  ngOnInit(): void {

    this.loader.start();
    // tslint:disable-next-line:max-line-length

    this.deviceService.getListOfDeviceWithAccessCount().subscribe((data) => {
      this.myDevice=data;
      this.loader.stop();
    }, e => {
      this.loader.stop();
      this.toastr.warning(e.error, 'Error');
      this.loader.stop();
    });
  }


}
