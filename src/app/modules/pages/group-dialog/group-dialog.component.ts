import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GroupDialogComponent>) { }
  close() {
    alert('fg');
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
