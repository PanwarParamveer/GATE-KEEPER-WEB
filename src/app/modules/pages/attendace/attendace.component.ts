import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment'
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
  constructor(private userService: UserService,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.userService.getUserName_Ids().subscribe((s) => {
      this.drpDetails = s;
      $('#userName').select2();
      setTimeout(() => {
        $('#userName').val('ALL').trigger('change');
      }, 100);


      this.loader.start();
      this.userService.getUsersAttendance(this.sDetails).subscribe((s) => {
        this.attendanceDtl = s;
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





    }, e => {
      this.toastr.warning('Some thing went wrong while fatching user data', 'Warning');
    });


  }
  onSubmit() {

    this.sDetails.userName = $('#userName option:selected').val();
    this.loader.start();
    this.userService.getUsersAttendance(this.sDetails).subscribe((data) => {
      this.attendanceDtl = data;
      this.loader.stop();
    }, e => {
      this.toastr.warning(e.error, 'Error');
      this.loader.stop();
    });
  }
}
