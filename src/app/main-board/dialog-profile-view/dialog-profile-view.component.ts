import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { MessageChatWindowComponent } from '../message-chat-window/message-chat-window.component';
import { OpenChatWindowResponsiveService } from '../../open-chat-window-responsive.service';
import { DialogChatUserlistComponent } from '../dialog-chat-userlist/dialog-chat-userlist.component';

@Component({
  selector: 'app-dialog-profile-view',
  standalone: true,
  imports: [],
  templateUrl: './dialog-profile-view.component.html',
  styleUrl: './dialog-profile-view.component.scss'
})
export class DialogProfileViewComponent {

  constructor(public dialogRef: MatDialogRef<DialogProfileViewComponent>,public dialogRef2: MatDialogRef<DialogChatUserlistComponent>, public firestoreService: FirestoreServiceService, public auth: AuthenticationService) {
    console.log(this.auth.auth.currentUser?.displayName);
    
  }

  closeProfilView() {
    this.dialogRef.close();
  }

  ResponsiveService = inject(OpenChatWindowResponsiveService);
  showChannels = true;
  showContacts = true

  openDirectMessage() {
    this.dialogRef.close();
    this.dialogRef2.close();
    let channelChatWindow = document.getElementById('app-channel-chat-window');
    let messageChatWindow = document.getElementById('app-message-chat-window');
    let newMessageWindow = document.getElementById('app-new-message');
  
    if (channelChatWindow && messageChatWindow && newMessageWindow) {
      this.ResponsiveService.directMessagesOpen = true;
      channelChatWindow.style.display = 'none';
      messageChatWindow.style.display = 'flex';
      newMessageWindow.style.display = 'none';
    }
  }

 


}
