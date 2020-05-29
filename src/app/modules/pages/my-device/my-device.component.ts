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

  myDevice: any = [1,2,3,4,5,6,7,8,9,10,11];
  constructor(private loader: NgxUiLoaderService, private deviceService: DeviceService,private toastr: ToastrService) { }


  ngOnInit(): void {

    this.loader.start();
    // tslint:disable-next-line:max-line-length
    this.deviceService.getListOfDevice().subscribe((data) => {
      $('#tblMyDevice').DataTable().destroy();
      // this.myDevice = data;
      setTimeout(() => {
        $('#tblMyDevice').DataTable({
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
