import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { ChannelService } from '../../../services/channel.service';

@Component({
  selector: 'app-dialog-create-channel',
  standalone: true,
  imports: [MatIconModule, FormsModule, CommonModule],
  templateUrl: './dialog-create-channel.component.html',
  styleUrl: './dialog-create-channel.component.scss'
})
export class DialogCreateChannelComponent {
  channelName:string = '';
  channelDescription:string = '';

  constructor(public dialogRef: MatDialogRef<DialogCreateChannelComponent>, 
    public channelservice: ChannelService) {

  }

  closeCreateChannelWindow() {
    this.dialogRef.close();
  }

  createChannel(){
    this.channelservice.channel.name = this.channelName;
    this.channelservice.channel.description = this.channelDescription;
    this.channelservice.addChannel();
  }
}
