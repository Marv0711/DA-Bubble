import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-profile-view',
  standalone: true,
  imports: [],
  templateUrl: './dialog-profile-view.component.html',
  styleUrl: './dialog-profile-view.component.scss'
})
export class DialogProfileViewComponent {

  constructor(public dialogRef: MatDialogRef<DialogProfileViewComponent>) {}

  closeProfilView() {
    this.dialogRef.close();
  }

}