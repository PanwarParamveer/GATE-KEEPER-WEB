import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../../services/userService/user.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from '../../services/deviceService/device.service';
import { NgOption } from '@ng-select/ng-select';
import { GateService } from '../../services/gateService/gate.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
declare var $;
@Component({
  selector: 'app-user-device-access',
  templateUrl: './user-device-access.component.html',
  styleUrls: ['./user-device-access.component.scss']
})
export class UserDeviceAccessComponent implements OnInit {

  userGateAccessList: any = {};



  constructor(private userService: UserService, 
    private gateService: GateService,
    private coolDialogs: NgxCoolDialogsService,
    private loader: NgxUiLoaderService, 
    private deviceService: DeviceService,
    private msgBox: ToastrService) { }

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
      this.msgBox.warning(e.error, 'Error');
      this.loader.stop();
    });

  }



  deleteGateAccess(gateAccessid: string) {

    // Confirm
    this.coolDialogs.confirm('Are you sure you want to delete this User Access ?')
      .subscribe(res => {
        if (res) {

          this.loader.start();
          this.gateService.deleteGateAccess(gateAccessid).subscribe(data => {
            this.msgBox.info("Access Deleted successfully.");
            this.userGateAccessList.forEach(el => {
              if (el.access_sys_id == gateAccessid) {
                this.loader.stop();
                this.userGateAccessList.splice(this.userGateAccessList.indexOf(el), 1);
                return;
              }
            });

          }, e => {
            this.msgBox.error("Something went wrong while deleting gate.");
            this.loader.stop();
          })

        }
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
        this.msgBox.warning(e.error, 'Error');
        this.loader.stop();
      });
    });
  }



}
