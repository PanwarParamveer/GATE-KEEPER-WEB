import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../../services/userService/user.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from '../../services/deviceService/device.service';
import { NgOption } from '@ng-select/ng-select';
import { GateService } from '../../services/gateService/gate.service';
declare var $;
@Component({
  selector: 'app-user-device-access',
  templateUrl: './user-device-access.component.html',
  styleUrls: ['./user-device-access.component.scss']
})
export class UserDeviceAccessComponent implements OnInit {

  userGateAccessList: any = {};



  constructor(private userService: UserService, private gateService: GateService, private loader: NgxUiLoaderService, private deviceService: DeviceService,
    private toastr: ToastrService) { }

  ngOnInit() {



    this.loader.start();
    // tslint:disable-next-line:max-line-length
    this.gateService.getUserAccessList().subscribe((data) => {
      $('#example1').DataTable().destroy();
      this.userGateAccessList = data;
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





  openGateAccessEditComponent(id) {
    this.gateService.openGateAccessViewComponent(id).afterClosed().subscribe(cl => {

      if (cl === false) {
        return;
      }

      this.gateService.getUserAccessList().subscribe((data) => {
        $('#example1').DataTable().destroy();
        this.userGateAccessList = data;
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
    });
  }



}
