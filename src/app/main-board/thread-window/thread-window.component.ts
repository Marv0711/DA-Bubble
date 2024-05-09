import { Component, Input, inject } from '@angular/core';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThreadMessageFieldComponent } from '../thread-message-field/thread-message-field.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../../services/authentication.service';
import { DialogProfileViewComponent } from '../dialog-profile-view/dialog-profile-view.component';
import { ThreadService } from '../../../services/thread.service';
import { ChannelService } from '../../../services/channel.service';
import { EmojiService } from '../../../services/emoji.service';
import { MatIconModule } from '@angular/material/icon';
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../services/chat.service';
import { OpenChatWindowResponsiveService } from '../../open-chat-window-responsive.service';



@Component({
  selector: 'app-thread-window',
  standalone: true,
  templateUrl: './thread-window.component.html',
  styleUrl: './thread-window.component.scss',
  imports: [CommonModule, ThreadMessageFieldComponent, MatIconModule, PickerModule, MatMenuModule, FormsModule]
})
export class ThreadWindowComponent {

  constructor(public threadService: ThreadService,
    public authService: AuthenticationService,
    public dialog: MatDialog,
    public chatService: FirestoreServiceService,
    public chatingService: ChatService,
    public channelService: ChannelService,
    public emojiService: EmojiService,
   ) {
  }

  ResponsiveService = inject(OpenChatWindowResponsiveService);
  newText: string[] = [];

  /**
  * Displays the profile of a user.
  * @param loginnames The login name of the user whose profile is being displayed.
  * @param usermail The email address of the user whose profile is being displayed.
  * @param userImg The URL of the profile image of the user.
  * @param chat An object containing chat information.
  */
  showProfil(loginnames: string, usermail: string, userImg: string, chat: any) {
    this.chatService.loginName = loginnames;
    this.chatService.userMail = usermail;
    this.chatService.userImage = userImg;
    // Get the online status of the user
    const onlinestatus = this.authService.getUserOnlineStatus(usermail)
    // Set the online status in the chat service
    this.chatService.userOnlineStatus = onlinestatus!
    // Open the profile view dialog
    this.openDialog();
  }


  openDialog() {
    this.dialog.open(DialogProfileViewComponent, {
      panelClass: 'profile-view-dialog-responsive',
    });
  }

  /**
  * Closes the thread by hiding its corresponding element in the DOM.
  */
  closeThread() {
    let threat = document.getElementById('app-thread-window');
    let workspaceMenu = document.getElementById('app-workspace-menu');
    if (threat && workspaceMenu) {
      threat.style.display = 'none';
      workspaceMenu.style.display = 'flex';
      this.ResponsiveService.chatOpenAndWithUnder1300px = false;
      this.ResponsiveService.directMessageOpenAndWithUnder1300px = false;
      this.ResponsiveService.newMessageOpenAndWithUnder1300px = false;
      this.ResponsiveService.threadOpenAndWithUnder1300px = false;
    }
  }

  /**
  * Prevents the propagation of the event.
  * @param event The event object.
  */
  dontclose(event: Event) {
    event.stopPropagation();
  }

  setEditChat(chat: any, i: number) {
    chat.editOpen = true;
    this.newText[i] = chat.threadAreaInput;
  }

  EditChat(chat: any, chatID: string, i: number) {
    let newText = this.newText[i]
    this.chatingService.editChat(chatID, 'thread', newText);
    this.newText[i] = '';
    chat.editOpen = false;
  }

  noEditChat(i: number, chat: any) {
    chat.editOpen = false;
    this.newText[i] = '';
  }

  emojiAmountUp(emoji: any, chatID: string, i: number) {
    let value;

    if (emoji['likerMail'].includes(this.chatService.currentUser.email)) {
      value = -1;
    }
    else {
      value = 1;
    }

    this.emojiService.UpdateEmojiAmount(chatID, value, i, 'thread')
  }

  onEvent(event: any) {
    event.stopPropagation();
  }

  toggleEmojiPicker(chat: any) {
    chat.showEmojiPicker = !chat.showEmojiPicker;
    if(chat.showEmojiPicker){
      this.chatingService.emojiPickerIsOpen = true;
      this.chatingService.openChat = chat;
    }else{
      this.chatingService.emojiPickerIsOpen = false;
    }
  }

  openThreadChat(chatId: string, chatText: string, chatloginName: string, chatTime: string, usermail: string, userImg: string, chatImage: string) {
    document.getElementById('threat')?.classList.remove('d-none');
    this.threadService.threadChatText = chatText;
    this.threadService.threadChatloginName = chatloginName;
    this.threadService.threadChatTime = chatTime;
    this.threadService.threadUserMail = usermail;
    this.threadService.threadUserImg = userImg;
    this.threadService.threadChatImage = chatImage;
  }

  closeEmojiFieldReaction() {
    this.emojiService.isEmojiPickerVisibleReaction = false;
  }

  addEmoji(event: any, chatID: string) {
    this.emojiService.addEmojiInChat(event.emoji.native, chatID, 'thread')
  }

}

