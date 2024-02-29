import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-create-channel',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './dialog-create-channel.component.html',
  styleUrl: './dialog-create-channel.component.scss'
})
export class DialogCreateChannelComponent {

  constructor(public dialogRef: MatDialogRef<DialogCreateChannelComponent>) {

  }

  

  closeCreateChannelWindow() {
    this.dialogRef.close();
  }
}
