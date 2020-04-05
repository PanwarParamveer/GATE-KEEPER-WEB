import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { MomentModule } from 'ngx-moment';
import * as moment from 'moment';
declare var $;
@Component({
  selector: 'app-attendace',
  templateUrl: './attendace.component.html',
  styleUrls: ['./attendace.component.scss']
})
export class AttendaceComponent implements OnInit {
  sDetails: any = {
    sDate: new Date().toISOString().split('T')[0],
    eDate: new Date().toISOString().split('T')[0]
  };
  drpDetails: any = {};
  attendanceDtl: any = {};
  constructor(private userService: UserService, private loader: NgxUiLoaderService, private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.userService.getUserName_Ids().subscribe((s) => {
      this.drpDetails = s;
      $('#userName').select2();
      setTimeout(() => {
        $('#userName').val('ALL').trigger('change');
      }, 100);

      // tslint:disable-next-line:prefer-const

      this.loader.start();

      // tslint:disable-next-line:variable-name
      const _sDate = new Date(this.sDetails.sDate);

      // tslint:disable-next-line:variable-name
      const _eDate = new Date(this.sDetails.eDate);
      _eDate.setHours(23, 59, 59);

      this.userService.getUsersAttendance({
        sDate: _sDate.toISOString(),
        eDate: _eDate.toISOString(),
        user_sys_id: 'ALL'
      }).subscribe((S) => {
        this.attendanceDtl = S;
        setTimeout(() => {
          $('#example1').DataTable({
            responsive: true,
            autoWidth: false, buttons: [
              'copy', 'csv', 'excel', 'pdf', 'print'
          ]
          });
        }, 100);
        this.loader.stop();

      }, e => {
        this.toastr.warning(e.error, 'Error');
        this.loader.stop();
      });





    }, e => {
      this.toastr.warning('Some thing went wrong while fatching user data', 'Warning');
    });


  }
  onSubmit() {

    this.sDetails.user_sys_id = $('#userName option:selected').val();


    // tslint:disable-next-line:variable-name
    const _sDate = new Date(this.sDetails.sDate);

    // tslint:disable-next-line:variable-name
    const _eDate = new Date(this.sDetails.eDate);
    _eDate.setHours(23, 59, 59);

    this.loader.start();
    // tslint:disable-next-line:max-line-length
    this.userService.getUsersAttendance({ sDate: _sDate.toISOString(),
       eDate: _eDate.toISOString(), user_sys_id: this.sDetails.user_sys_id }).subscribe((data) => {
      $('#example1').DataTable().destroy();
      this.attendanceDtl = data;
      setTimeout(() => {
        $('#example1').DataTable({
          responsive: true,
          autoWidth: false,
          buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
        });
      }, 100);
      this.loader.stop();
    }, e => {
      this.toastr.warning(e.error, 'Error');
      this.loader.stop();
    });
  }
}
