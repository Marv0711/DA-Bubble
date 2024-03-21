import { Component } from '@angular/core';
import { MessageFieldComponent } from "../message-field/message-field.component";
import { DialogEditChannelComponent } from '../dialog-edit-channel/dialog-edit-channel.component';
import { MatDialog } from '@angular/material/dialog';
import { CloseEmojiService } from '../../../services/close-emoji.service';
import { DialogAddUserToChannelComponent } from '../dialog-add-user-to-channel/dialog-add-user-to-channel.component';
import { DialogChatUserlistComponent } from '../dialog-chat-userlist/dialog-chat-userlist.component';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Chat } from '../../../models/chat.class';
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { DialogProfileViewComponent } from '../dialog-profile-view/dialog-profile-view.component';



@Component({
  selector: 'app-channel-chat-window',
  standalone: true,
  templateUrl: './channel-chat-window.component.html',
  styleUrl: './channel-chat-window.component.scss',
  imports: [MessageFieldComponent, CommonModule, MatIconModule, PickerModule]
})
export class ChannelChatWindowComponent {


  constructor(public dialog: MatDialog, public CloseEmojiService: CloseEmojiService, public chatService: FirestoreServiceService) { }

  log(log: string) {
    console.log(log)
  }

  addEmoji(event: any, chatID: string) {
    this.chatService.addEmojiInChat(event.emoji.native, chatID)
  }

  toggleEmojiPicker(chat: any) {
    chat.showEmojiPicker = !chat.showEmojiPicker;
  }

  showEmojiPicker(chat: any) {
    chat.showEmojiPicker = true;
  }

  hideEmojiPicker(chat: any) {
    chat.showEmojiPicker = false;
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

  dontclose(event: Event) {
    event.stopPropagation();
  }




  openThreadChat(chatId: string, chatText: string, chatloginName: string, chatTime: string) {
    document.getElementById('threat')?.classList.remove('d-none');
    this.chatService.threadChatText = chatText;
    this.chatService.threadChatloginName = chatloginName;
    this.chatService.threadChatTime = chatTime;

  }

  showProfil(loginnames: string, usermail: string, userImg:string) {
    this.chatService.loginName = loginnames;
    this.chatService.userMail = usermail;
    this.chatService.userImage = userImg;
    this.dialog.open(DialogProfileViewComponent);
    console.log(usermail);
  }

  openEditChannel() {
    this.dialog.open(DialogEditChannelComponent, {
      panelClass: ['edit-channel-dialog-responsive'],
    });

  }

  openAddUserdialog() {
    if (window.innerWidth < 550) {
      this.openUserList();
    } else {
      this.dialog.open(DialogAddUserToChannelComponent, {
        position: {
          top: '190px',
          right: '590px',
        },
        panelClass: ['custom-container', 'add-user-dialog-responsive'],
        backdropClass: 'backdrop-add-user-dialog'
      });
    }
  }

  openUserList() {
    this.dialog.open(DialogChatUserlistComponent, {
      position: {
        top: '190px',
        right: '690px',
      },
      panelClass: ['custom-container', 'open-user-dialog-responsive'],
    });
  }

  onEvent(event: any) {
    event.stopPropagation()
  }



}
