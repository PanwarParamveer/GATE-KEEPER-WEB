import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../../services/userService/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IUser } from '../../myInterface/Iuser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})



export class UserViewComponent implements OnInit {

  public editMode: any;
  public disableInputs = false;
  constructor(private routerParams: ActivatedRoute, private userService: UserService, private loader: NgxUiLoaderService) { }

  public userId: any;
  public userDetails: any = {};

  ngOnInit() {
    // tslint:disable-next-line:no-unused-expression
    // tslint:disable-next-line:no-debugger
    debugger;
    this.userId = this.routerParams.snapshot.paramMap.get('id');

    if (this.userId === 'add') {
      this.disableInputs = false;
      this.userDetails = {};
    } else {
      this.disableInputs = true;
      this.loader.start();
      this.userService.getUserById(this.userId).subscribe(data => {

        this.userDetails = data;

      }, error => {
        this.loader.start();
        alert(error);
      }, () => {
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

  update(frm) {
    // tslint:disable-next-line:no-debugger
    debugger;
    this.loader.start();
    frm.value.user_sys_id = this.userId;
    this.userService.updateUserDetails(frm.value).subscribe((d) => {
      this.loader.stop();

    }, (e) => {
      alert(e.message);
    });
  }

}
