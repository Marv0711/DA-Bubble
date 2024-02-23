import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-channel',
  standalone: true,
  imports: [],
  templateUrl: './dialog-edit-channel.component.html',
  styleUrl: './dialog-edit-channel.component.scss'
})
export class DialogEditChannelComponent {

  constructor(public dialogRef: MatDialogRef<DialogEditChannelComponent>) {}

  closeEditWindowChannel() {
    this.dialogRef.close();
  }
  
  leftEditWindowChannel() {
    this.closeEditWindowChannel();
  }
}
