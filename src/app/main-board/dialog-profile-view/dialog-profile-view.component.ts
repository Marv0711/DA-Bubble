import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { MessageChatWindowComponent } from '../message-chat-window/message-chat-window.component';
import { OpenChatWindowResponsiveService } from '../../open-chat-window-responsive.service';
import { DialogChatUserlistComponent } from '../dialog-chat-userlist/dialog-chat-userlist.component';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-dialog-profile-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog-profile-view.component.html',
  styleUrl: './dialog-profile-view.component.scss'
})
export class DialogProfileViewComponent {
  // Inject OpenChatWindowResponsiveService into ResponsiveService
  ResponsiveService = inject(OpenChatWindowResponsiveService);
  // Boolean flag indicating whether to show channels
  showChannels = true;
  // Boolean flag indicating whether to show contacts
  showContacts = true

  constructor(public dialogRef: MatDialogRef<DialogProfileViewComponent>,
    public dialogRef2: MatDialogRef<DialogChatUserlistComponent>,
    public firestoreService: FirestoreServiceService,
    public auth: AuthenticationService,
    public chatService: ChatService
  ) {
  }

  /**
  * Closes the profile view dialog.
  */
  closeProfilView() {
    this.dialogRef.close();
  }

  /**
  * Opens the direct message chat window.
  */
  openDirectMessage() {
    this.dialogRef.close();
    this.dialogRef2.close();
    let channelChatWindow = document.getElementById('app-channel-chat-window');
    let messageChatWindow = document.getElementById('app-message-chat-window');
    let newMessageWindow = document.getElementById('app-new-message');
    let threat = document.getElementById('threat');
    // Check if all necessary elements exist
    if (channelChatWindow && messageChatWindow && newMessageWindow && threat) {
      this.ResponsiveService.directMessagesOpen = true;
      channelChatWindow.style.display = 'none';
      messageChatWindow.style.display = 'flex';
      newMessageWindow.style.display = 'none';
      threat.style.display = 'none';
    }
  }

}
