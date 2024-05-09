import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { ChannelService } from '../../../services/channel.service';
import { AuthenticationService } from '../../../services/authentication.service';

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
    public channelservice: ChannelService,
    public authservice: AuthenticationService) {

  }

  closeCreateChannelWindow() {
    this.dialogRef.close();
  }

  /**
 * Creates a new channel.
 * It sets the name and description of the channel,
 * adds the current user's email to the list of users,
 * adds the channel using the channel service,
 * and closes the dialog.
 */
  createChannel(){
    this.channelservice.channel.name = this.channelName;
    this.channelservice.channel.description = this.channelDescription;
    this.channelservice.channel.users.push(this.authservice.currentUser.email);
    this.channelservice.channel.author = this.authservice.currentUser.displayName
    this.channelservice.addChannel();
    this.dialogRef.close();
  }

  isChannelInAllChannels(){
    return this.channelservice.AllChannels.includes(this.channelName)
  }
}
