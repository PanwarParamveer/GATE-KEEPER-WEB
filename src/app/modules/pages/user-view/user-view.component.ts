import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../../services/userService/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IUser } from '../../myInterface/Iuser';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})



export class UserViewComponent implements OnInit {

  public editMode: any;
  public disableInputs = false;
  constructor(private router: Router,
    private routerParams: ActivatedRoute,
    private userService: UserService,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService
  ) { }

  public userId: any;
  // public userDetails: any = {};
  userDetails: any = {};
  ngOnInit() {
    // tslint:disable-next-line:no-unused-expression
    // tslint:disable-next-line:no-debugger

    this.userId = this.routerParams.snapshot.paramMap.get('id');

    if (this.userId === 'add') {
      this.disableInputs = false;
      this.userDetails = {};
    } else {
      this.disableInputs = true;
      this.loader.start();
      this.userService.getUserById(this.userId).subscribe(data => {
        this.userDetails = data;
        this.userDetails.shift_time = moment.utc(this.userDetails.shift_time, 'hh:mm').local().format('HH:mm');
      }, error => {
        this.loader.start();
        alert(error);
      }, () => {
        this.loader.stop();
      });
    }
  }

  onSubmit() {
    this.loader.start();
    const tempData = this.userDetails;
    tempData.shift_time =  moment(this.userDetails.shift_time, 'hh:mm').utc().format('HH:mm');

    if (this.userId === 'add') {
      this.userService.createNewUser(tempData).subscribe((d) => {
        this.toastr.success(d, 'Success');
        this.router.navigate(['/members/users']);
        this.loader.stop();
      }, (e) => {
        this.toastr.error(e.error, 'Error');
        this.loader.stop();
      });
    } else {
      this.userDetails.user_sys_id = this.userId;
      this.userService.updateUserDetails(tempData).subscribe((d) => {
        this.toastr.success(d, 'Success');
        this.router.navigate(['/members/users']);
        this.disableInputs = true;
        this.loader.stop();
      }, (e) => {

        this.toastr.error(e.error, 'Error');
        this.loader.stop();
      });
    }
  }
  editMode_click() {
    this.disableInputs = false;
    this.editMode = true;
  }
  cancel_click() {
    this.disableInputs = true;
    this.editMode = false;
  }


}
