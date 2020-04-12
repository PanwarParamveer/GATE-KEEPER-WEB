import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { GroupDialogComponent } from '../group-dialog/group-dialog.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  constructor(private matDialog: MatDialog) {}
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = 'some data';
    this.matDialog.open(GroupDialogComponent, dialogConfig);
  }


  ngOnInit(): void {
  }

}
