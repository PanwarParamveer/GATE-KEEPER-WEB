import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DeviceService } from '../../services/deviceService/device.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
declare var $;
@Component({
  selector: 'app-device-config',
  templateUrl: './device-config.component.html',
  styleUrls: ['./device-config.component.scss']
})
export class DeviceConfigComponent implements OnInit {
deviceNameEditMode: Boolean=false;
  deviceInfo: any={};
  device_id: string;
  newDeviceName: string;
  constructor(private loader: NgxUiLoaderService,
     private deviceService: DeviceService,
     private toastr: ToastrService,
     private routerParams: ActivatedRoute
     ) { }


  ngOnInit(): void {
    this.device_id = this.routerParams.snapshot.paramMap.get('id');

    this.loader.start();
    // tslint:disable-next-line:max-line-length

    this.deviceService.getDeviceInfo(this.device_id).subscribe((data) => {
      this.deviceInfo=data;

      setTimeout(() => {
        $('#tblMapping').DataTable({
          responsive: true,
          autoWidth: true,
        });
      }, 300);

      this.loader.stop();
    }, e => {
      this.loader.stop();
      this.toastr.warning(e.error, 'Error');
      this.loader.stop();
    });

  }

  enableDeviceEditMode(editMode: Boolean){
    this.deviceNameEditMode=editMode;
  }

  updateDeviceName(){

    this.loader.start();
    this.deviceService.updateDeviceName(this.device_id,this.newDeviceName).subscribe((data: any) => {
      this.deviceInfo.device_name=data.device_name;
      this.deviceNameEditMode=false;
       this.loader.stop();
    }, e => {
      this.loader.stop();
      this.toastr.error(e.error.message, 'Error');
      this.loader.stop();
    });
  }

}
