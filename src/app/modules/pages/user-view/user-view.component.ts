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

declare var $;
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
  isImageSelected=false;
  // public userDetails: any = {};
  userDetails: any = {};
  statusType :any =["ACTIVE","IN-ACTIVE"];
  ngOnInit() {
    // tslint:disable-next-line:no-unused-expression
    // tslint:disable-next-line:no-debugger

    this.userId = this.routerParams.snapshot.paramMap.get('id');

    if (this.userId === 'add') { 
      this.userDetails = {};
      this.userDetails.status="ACTIVE";
      this.disableInputs = false;
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
        this.router.navigate(['/users']);
        this.loader.stop();
      }, (e) => {
        this.toastr.error(e.error, 'Error');
        this.loader.stop();
      });
    } else {
      this.userDetails.user_sys_id = this.userId;
      this.userService.updateUserDetails(tempData).subscribe((d) => {
        this.toastr.success(d, 'Success');
        this.router.navigate(['/users']);
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


  ImageSelected($event) {
    if ($event.target.files && $event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#imagePreview').css('background-image', 'url('+e.target.result +')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        this.isImageSelected=true;
        reader.readAsDataURL($event.target.files[0]);
    }
}

updateProfile(){
  this.loader.start();
  var file = $('#imageUpload')[0].files[0];
  this.userService.updateProfilePhoto(file,this.userId).then(s=>{
    this.toastr.success(s, 'Updated');
    this.loader.stop();
  }).catch(err=>{
    this.toastr.error(err.message, 'Error');
      this.loader.stop();
  });
}

}
