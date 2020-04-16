import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/userService/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from '../../services/deviceService/device.service';

@Component({
  selector: 'app-user-device-access-view',
  templateUrl: './user-device-access-view.component.html',
  styleUrls: ['./user-device-access-view.component.scss']
})
export class UserDeviceAccessViewComponent implements OnInit {
  private editMode: any;
  private disableInputs = false;
  private docID: any;
  private userAccessDetails: any = {};
  private pageHeader = 'User Device Access';

  constructor(private router: Router,
              private routerParams: ActivatedRoute,
              private deviceService: DeviceService,
              private loader: NgxUiLoaderService,
              private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.docID = this.routerParams.snapshot.paramMap.get('id');

    if (this.docID === 'NEW') {
      this.disableInputs = false;
    } else {
      this.disableInputs = false;
  }

}

}
