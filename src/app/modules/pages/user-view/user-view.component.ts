import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../../services/userService/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  public cDetails: any = {}
  public editMode: Boolean;
  constructor(private routerParams: ActivatedRoute, private userService: UserService, private loader: NgxUiLoaderService) { }

  userId: any;
 public userDetails:any = {};
 
  ngOnInit() {
    this.userId = this.routerParams.snapshot.paramMap.get('id');

    if (this.userId == 'add') {
      this.editMode = false;
    } else {
      this.editMode = true;
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
}
