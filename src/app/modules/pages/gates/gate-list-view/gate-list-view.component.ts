import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { GateService } from 'src/app/modules/services/gateService/gate.service';
import { DeviceService } from 'src/app/modules/services/deviceService/device.service';
import { NgxCoolDialogsService } from 'ngx-cool-dialogs';
import { IgateDetail } from 'src/app/modules/myInterface/IgateDetail';

@Component({
  selector: 'app-gate-list-view',
  templateUrl: './gate-list-view.component.html',
  styleUrls: ['./gate-list-view.component.scss']
})


export class GateListViewComponent implements OnInit {
  gateId: string;
  frmName: string;
  gateDtl: IgateDetail = { active: true, description: "", device_id: "", gate_name: "" };
  editMode = false;
  device_list: any;
  constructor(
    private gateService: GateService, private deviceService: DeviceService,
    private coolDialogs: NgxCoolDialogsService,

    private loader: NgxUiLoaderService,
    private msgBox: ToastrService,
    private dialogRef: MatDialogRef<GateListViewComponent>,
    @Inject(MAT_DIALOG_DATA) gatedata
  ) {

    this.frmName = gatedata.frmName;
    if (gatedata.data !== null) {
      this.gateDtl = gatedata.data;
      this.editMode = true;
    }

  }

  ngOnInit() {
    this.loader.start();
    this.deviceService.getShortListOfDevice().subscribe(deviceList => {
      this.device_list = deviceList;
      this.loader.stop();
    }, e => {
      this.loader.stop();
    });
  }

  save() {
    if (this.gateDtl.gate_name == '') {
      this.msgBox.error('Enter valid gate name.');
      return;
    }
    if (this.gateDtl.device_id === undefined) {
      this.msgBox.error('Choose Device');
      return;
    }

    if (this.gateDtl.description === '') {
      this.msgBox.error('Enter meaningful gate description');
      return;
    }


    this.loader.start();

    if (this.editMode == false) {
      this.gateService.createNewGate(this.gateDtl).subscribe(data => {
        this.msgBox.info("Gate created successfully.");
        this.loader.stop();
        this.dialogRef.close(true);
      }, e => {
        this.msgBox.error(e.error);
        this.loader.stop();
      })
    }
    else {


      this.gateService.updateGateDetails(this.gateDtl).subscribe(data => {
        this.msgBox.info("Gate details updated successfully.");
        this.loader.stop();
        this.dialogRef.close(true);
      }, e => {
        this.msgBox.error(e.error);
        this.loader.stop();
      })
    }

  }

  close() {
    this.dialogRef.close(false);
  }


}
