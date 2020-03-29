import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
declare var $;
@Component({
  selector: 'app-attendace',
  templateUrl: './attendace.component.html',
  styleUrls: ['./attendace.component.scss']
})
export class AttendaceComponent implements OnInit {
  sDetails: any = {};
  drpDetails: any = {};
  attendanceDtl: any = {};
  constructor(private userService: UserService,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.userService.getUserName_Ids().subscribe((s) => {
      this.drpDetails = s;
      $('.select2').select2();
    }, e => {
      this.toastr.warning('Some thing went wrong while fatching user data', 'Warning');
    });
    this.loader.start();
    this.userService.getUsersAttendance(this.sDetails).subscribe((s) => {
      this.attendanceDtl = s;
      setTimeout(() => {
        $('#example1').DataTable({
          responsive: true,
          autoWidth: false,
        });
      }, 300);
      this.loader.stop();

    }, e => {
      this.toastr.warning('Some thing went wrong while fatching user data', 'Warning');
      this.loader.stop();
    });


  }
  onSubmit() {
    this.sDetails.userName = $('#userName').val();
    alert( this.sDetails);

  }
}
