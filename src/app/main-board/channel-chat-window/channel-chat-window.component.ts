import { Component } from '@angular/core';
import { MessageFieldComponent } from "../message-field/message-field.component";
import { DialogEditChannelComponent } from '../dialog-edit-channel/dialog-edit-channel.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserToChannelComponent } from '../dialog-add-user-to-channel/dialog-add-user-to-channel.component';
import { DialogChatUserlistComponent } from '../dialog-chat-userlist/dialog-chat-userlist.component';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { DialogProfileViewComponent } from '../dialog-profile-view/dialog-profile-view.component';
import { AuthenticationService } from '../../../services/authentication.service';
import { ThreadService } from '../../../services/thread.service';
import { EmojiService } from '../../../services/emoji.service';
import { ChatService } from '../../../services/chat.service';
import { ChannelService } from '../../../services/channel.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-channel-chat-window',
  standalone: true,
  templateUrl: './channel-chat-window.component.html',
  styleUrl: './channel-chat-window.component.scss',
  imports: [MessageFieldComponent, CommonModule, MatIconModule, PickerModule, MatMenuModule, MatButtonModule]
})
export class ChannelChatWindowComponent {

  constructor(public threadService: ThreadService,
    public dialog: MatDialog,
    public emojiService: EmojiService,
    public chatService: ChatService,
    private authService: AuthenticationService,
    public firestoreService: FirestoreServiceService,
    public channelService: ChannelService) { }

  addEmoji(event: any, chatID: string) {
    this.emojiService.addEmojiInChat(event.emoji.native, chatID, 'chat')
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
    this.emojiService.isEmojiPickerVisibleReaction = false;
  }

  emojiAmountUp(emoji: any, chatID: string, i: number) {
    let value;

    if (emoji['likerMail'].includes(this.firestoreService.currentUser.email)) {
      value = -1;
    }
    else {
      value = 1;
    }

    this.emojiService.UpdateEmojiAmount(chatID, value, i, 'chat')
  }

  dontclose(event: Event) {
    event.stopPropagation();
  }




  openThreadChat(chatId: string, chatText: string, chatloginName: string, chatTime: string, usermail: string, userImg: string, chatImage: string) {
    document.getElementById('threat')?.classList.remove('d-none');
    this.threadService.threadChatText = chatText;
    this.threadService.threadChatloginName = chatloginName;
    this.threadService.threadChatTime = chatTime;
    this.threadService.threadUserMail = usermail;
    this.threadService.threadUserImg = userImg;
    this.threadService.threadChatImage = chatImage
  }

  showProfil(loginnames: string, usermail: string, userImg: string) {
    this.firestoreService.loginName = loginnames;
    this.firestoreService.userMail = usermail;
    this.firestoreService.userImage = userImg;
    const onlinestatus = this.authService.getUserOnlineStatus(usermail)
    this.firestoreService.userOnlineStatus = onlinestatus
    this.dialog.open(DialogProfileViewComponent);
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
    event.stopPropagation();
  }

  getAnswerCount(chatID: string) {
    let counter = 0;
    let ALLthreadList = this.threadService.ALLthreadList;

    ALLthreadList.forEach((element: any) => {
      if (element.id == chatID) {
        counter++
      }
    });
    return counter
  }

  getlastAnswerTime(chatID: string) {
    let lastAnswer: any;
    let ALLthreadList = this.threadService.ALLthreadList;

    ALLthreadList.forEach((element: any) => {
      if (element.id == chatID) {
        lastAnswer = element.Date
      }
    });
    return lastAnswer
  }

  mirrorChatCurrentUser() {
    let mirrorChat = document.querySelector('.message-div');
    let flippedCurrentName = document.querySelector('h3');
    let currentTime = document.querySelector('.time');
    let currentText = document.querySelector('.flipped-text');
    let answer = document.getElementById('.nunito');
    let answers = document.getElementById('answers');

    mirrorChat?.classList.add('message-div-flipped');
    flippedCurrentName?.classList.add('current-name-flipped');
    currentTime?.classList.add('current-time-flipped');
    currentText?.classList.add('current-text-flipped');
    answer?.classList.add('answer-flipped');
    answers?.classList.add('answers-flipped');



  }


}
