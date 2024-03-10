import { Component } from '@angular/core';
import { MessageFieldComponent } from '../message-field/message-field.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CloseEmojiService } from '../../../services/close-emoji.service';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { DialogEditChannelComponent } from '../dialog-edit-channel/dialog-edit-channel.component';
import { DialogAddUserToChannelComponent } from '../dialog-add-user-to-channel/dialog-add-user-to-channel.component';
import { DialogChatUserlistComponent } from '../dialog-chat-userlist/dialog-chat-userlist.component';
import { Chat } from '../../../models/chat.class';
import { DialogProfileViewComponent } from '../dialog-profile-view/dialog-profile-view.component';

@Component({
  selector: 'app-message-chat-window',
  standalone: true,
  imports: [MessageFieldComponent, CommonModule, DialogProfileViewComponent],
  templateUrl: './message-chat-window.component.html',
  styleUrl: './message-chat-window.component.scss'
})
export class MessageChatWindowComponent {

  chatModel = new Chat();

  constructor(public dialog: MatDialog, public CloseEmojiService: CloseEmojiService, public chatService: FirestoreServiceService) { }


  dontclose(event: Event) {
      event.stopPropagation();
  };

  openDialog() {
    this.dialog.open(DialogProfileViewComponent,{
      panelClass: 'profile-view-dialog-responsive',
    });
}

}
