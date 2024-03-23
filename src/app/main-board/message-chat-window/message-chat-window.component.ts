import { Component } from '@angular/core';
import { MessageFieldComponent } from '../message-field/message-field.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CloseEmojiService } from '../../../services/close-emoji.service';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { Chat } from '../../../models/chat.class';
import { DialogProfileViewComponent } from '../dialog-profile-view/dialog-profile-view.component';
import { ChannelChatWindowComponent } from "../channel-chat-window/channel-chat-window.component";
import { MatIconModule } from '@angular/material/icon';
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { PrivatMessageFieldComponent } from "./privat-message-field/privat-message-field.component";
import { ThreadService } from '../../../services/thread.service';

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

  constructor(public threadService: ThreadService, public dialog: MatDialog, public CloseEmojiService: CloseEmojiService, public chatService: FirestoreServiceService, public authentication: AuthenticationService) { }


  dontclose(event: Event) {
    event.stopPropagation();
  };

  openDialog() {
    this.dialog.open(DialogProfileViewComponent, {
      panelClass: 'profile-view-dialog-responsive',
    });
  }

  addEmoji(event: any, chatID: string) {
    this.chatService.addEmojiInChat(event.emoji.native, chatID)
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

  //ChatWindow

  showEmojiPicker(chat: any) {
    chat.showEmojiPicker = true;
  }

  hideEmojiPicker(chat: any) {
    chat.showEmojiPicker = false;
  }

  showProfil(loginnames: string, usermail: string) {
    this.chatService.loginName = loginnames;
    this.chatService.userMail = usermail;
    this.dialog.open(DialogProfileViewComponent);
  }

  openThreadChat(chatId: string, chatText: string, chatloginName: string, chatTime: string) {
    document.getElementById('threat')?.classList.remove('d-none');
    this.threadService.threadChatText = chatText;
    this.threadService.threadChatloginName = chatloginName;
    this.threadService.threadChatTime = chatTime;
    console.log(chatId);
  }

  closeEmojiFieldReaction() {
    this.CloseEmojiService.isEmojiPickerVisibleReaction = false;
  }

  emojiAmountUp(emoji: any, chatID: string, i: number) {
    let value;

    if (emoji['likerMail'].includes(this.chatService.currentUser.email)) {
      value = -1;
    }
    else {
      value = 1;
    }

    this.chatService.UpdateEmojiAmount(chatID, value, i)
  }


}
