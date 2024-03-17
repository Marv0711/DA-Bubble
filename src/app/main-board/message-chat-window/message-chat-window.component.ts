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
import { ChannelChatWindowComponent } from "../channel-chat-window/channel-chat-window.component";
import { MatIconModule } from '@angular/material/icon';
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { PrivatMessageFieldComponent } from "./privat-message-field/privat-message-field.component";

@Component({
    selector: 'app-message-chat-window',
    standalone: true,
    templateUrl: './message-chat-window.component.html',
    styleUrl: './message-chat-window.component.scss',
    imports: [FormsModule, MatIconModule, MessageFieldComponent, CommonModule, DialogProfileViewComponent, ChannelChatWindowComponent, PickerModule, PrivatMessageFieldComponent]
})
export class MessageChatWindowComponent {

  chatModel = new Chat();
  public textAreaInput: string = '';
  chatTime: Date = new Date();
  chatDate: Date = new Date();

  constructor(public dialog: MatDialog, public CloseEmojiService: CloseEmojiService, public chatService: FirestoreServiceService, public authentication: AuthenticationService) { }


  dontclose(event: Event) {
    event.stopPropagation();
  };

  openDialog() {
    this.dialog.open(DialogProfileViewComponent, {
      panelClass: 'profile-view-dialog-responsive',
    });
  }

  addEmoji(event: any) {
    this.textAreaInput = `${this.textAreaInput}${event.emoji.native}`;
    this.CloseEmojiService.isEmojiPickerVisible = false;
  }

  closeEmojiField() {
    this.CloseEmojiService.isEmojiPickerVisible = false;
  }

  sendMessageToPrivatChat() {
    let member = [this.chatService.currentUser.email, this.chatService.currentContactUser.mail]

    this.chatService.privatChat.textAreaInput = this.textAreaInput;
    this.chatService.privatChat.loginName = this.authentication.currentUser.displayName;
    this.chatService.privatChat.chatTime = this.chatTime.getTime();
    this.chatService.privatChat.member = member;

    this.chatService.savePrivateChat();
    this.textAreaInput = '';

    setTimeout(() => {
      document.getElementById('chat-container')?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
  }

}
