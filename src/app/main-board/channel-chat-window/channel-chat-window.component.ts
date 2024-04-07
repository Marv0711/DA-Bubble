import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MessageFieldComponent } from "../message-field/message-field.component";
import { DialogEditChannelComponent } from '../dialog-edit-channel/dialog-edit-channel.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserToChannelComponent } from '../dialog-add-user-to-channel/dialog-add-user-to-channel.component';
import { DialogChatUserlistComponent } from '../dialog-chat-userlist/dialog-chat-userlist.component';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { CommonModule, DatePipe } from '@angular/common';
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
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-channel-chat-window',
  standalone: true,
  templateUrl: './channel-chat-window.component.html',
  styleUrl: './channel-chat-window.component.scss',
  imports: [MessageFieldComponent, CommonModule, MatIconModule, PickerModule, MatMenuModule, MatButtonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [DatePipe]
})
export class ChannelChatWindowComponent {

  newText: string[] = [];

  constructor(public threadService: ThreadService,
    public dialog: MatDialog,
    public emojiService: EmojiService,
    public chatService: ChatService,
    public authService: AuthenticationService,
    public firestoreService: FirestoreServiceService,
    public channelService: ChannelService,
    private datePipe: DatePipe

  ) {
    console.log(this.chatService.chatList)
  }

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

  setEditChat(chat: any, i: number) {
    chat.editOpen = true;
    this.newText[i] = chat.textAreaInput;
  }

  EditChat(chat: any, chatID: string, i: number) {
    let newText = this.newText[i]
    this.chatService.editChat(chatID, 'chat', newText);
    this.threadService.threadChatText = newText;
    this.newText[i] = '';
    chat.editOpen = false;
  }

  noEditChat(i: number, chat: any) {
    chat.editOpen = false;
    this.newText[i] = '';
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



  formatDate(chatDate: number): string {
    const chatDateObject = new Date(chatDate);
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    const chatDay = chatDateObject.getDate();
    const chatMonth = chatDateObject.getMonth();
    const chatYear = chatDateObject.getFullYear();
    const daysOfWeek = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

    if (chatYear === todayYear && chatMonth === todayMonth && chatDay === todayDate) {
      return 'heute';
    } else {
      const dayOfWeek = daysOfWeek[chatDateObject.getDay()];
      const month = months[chatMonth];
      return `${dayOfWeek}, ${chatDay}. ${month}`;
    }
  }

  mirrorCurrentUser() {

  }
}
