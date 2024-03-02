import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-create-channel',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  templateUrl: './dialog-create-channel.component.html',
  styleUrl: './dialog-create-channel.component.scss'
})
export class DialogCreateChannelComponent {
  channelName:string = '';
  channeDescription:string = '';

  constructor(public dialogRef: MatDialogRef<DialogCreateChannelComponent>) {

  }

  closeCreateChannelWindow() {
    this.dialogRef.close();
  }
}
