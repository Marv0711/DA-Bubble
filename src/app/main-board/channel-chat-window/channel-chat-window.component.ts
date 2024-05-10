import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
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
import { OpenChatWindowResponsiveService } from '../../open-chat-window-responsive.service';


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
  isHovered: boolean = false;

  ResponsiveService = inject(OpenChatWindowResponsiveService);

  newText: string[] = [];

  constructor(public threadService: ThreadService,
    public dialog: MatDialog,
    public emojiService: EmojiService,
    public chatService: ChatService,
    public authService: AuthenticationService,
    public firestoreService: FirestoreServiceService,
    public channelService: ChannelService,
    private datePipe: DatePipe

  ) { }

  /**
 * Adds an emoji to a chat message.
 * @param {any} event - The event containing the selected emoji.
 * @param {string} chatID - The ID of the chat message to add the emoji to.
 */
  addEmoji(event: any, chatID: string) {
    this.emojiService.addEmojiInChat(event.emoji.native, chatID, 'chat')
  }

  changeSrcOnHover(hovered: boolean) {
    this.isHovered = hovered;
  }

  /**
 * Toggles the visibility of the emoji picker associated with a chat message.
 * @param {any} chat - The chat message object whose emoji picker visibility is to be toggled.
 */
  toggleEmojiPicker(chat: any) {
    chat.showEmojiPicker = !chat.showEmojiPicker;
    if(chat.showEmojiPicker){
      this.chatService.emojiPickerIsOpen = true;
      this.chatService.openChat = chat;
    }else{
      this.chatService.emojiPickerIsOpen = false;
    }
  }

  /**
 * Displays the emoji picker associated with a chat message.
 * @param {any} chat - The chat message object whose emoji picker is to be displayed.
 */
  showEmojiPicker(chat: any) {
    chat.showEmojiPicker = true;
  }

  /**
 * Hides the emoji picker associated with a chat message.
 * @param {any} chat - The chat message object whose emoji picker is to be hidden.
 */
  hideEmojiPicker(chat: any) {
    chat.showEmojiPicker = false;
  }

  /**
 * Closes the emoji picker for reactions.
 * It sets the visibility of the emoji picker to false.
 */
  closeEmojiFieldReaction() {
    this.emojiService.isEmojiPickerVisibleReaction = false;
  }

  /**
 * Increases the amount of emojis associated with a chat message.
 * @param {any} emoji - The emoji object being interacted with.
 * @param {string} chatID - The ID of the chat message associated with the emoji.
 * @param {number} i - The index of the chat message in the array.
 */
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

  /**
 * Prevents the propagation of the event to higher elements in the DOM hierarchy.
 * @param {Event} event - The event whose propagation is to be stopped.
 */
  dontclose(event: Event) {
    event.stopPropagation();
  }

  /**
 * Sets a chat message for editing, enabling the editing interface and populating it with the current message content.
 * @param {any} chat - The chat message object to be edited.
 * @param {number} i - The index of the chat message being edited.
 */
  setEditChat(chat: any, i: number) {
    chat.editOpen = true;
    this.newText[i] = chat.textAreaInput;
  }

  /**
 * Edits a chat message and updates its content.
 * @param {any} chat - The chat message object being edited.
 * @param {string} chatID - The ID of the chat message being edited.
 * @param {number} i - The index of the chat message being edited.
 */
  EditChat(chat: any, chatID: string, i: number) {
    let newText = this.newText[i]
    this.chatService.editChat(chatID, 'chat', newText);
    this.threadService.threadChatText = newText;
    this.newText[i] = '';
    chat.editOpen = false;
  }

  /**
   * Cancels the editing of a chat message and clears the edited text.
   * @param {number} i - The index of the chat message being edited.
   * @param {any} chat - The chat message object being edited.
   */
  noEditChat(i: number, chat: any) {
    chat.editOpen = false;
    this.newText[i] = '';
  }

  /**
 * Opens a thread chat and populates it with the provided data.
 * @param {string} chatId - The ID of the chat thread to open.
 * @param {string} chatText - The text content of the chat.
 * @param {string} chatloginName - The login name of the user who sent the chat.
 * @param {string} chatTime - The timestamp of the chat.
 * @param {string} usermail - The email address of the user associated with the chat.
 * @param {string} userImg - The URL of the profile image of the user associated with the chat.
 * @param {string} chatImage - The URL of any image associated with the chat.
 */
  openThreadChat(chatId: string, chatText: string, chatloginName: string, chatTime: string, usermail: string, userImg: string, chatImage: string) {
    let threat = document.getElementById('app-thread-window');
    let channelChatWindow = document.getElementById('app-channel-chat-window');
    let workspaceMenu = document.getElementById('app-workspace-menu');
    if(threat){
      threat.style.display = 'flex';
      threat.classList.remove('d-none');
    }
    this.ResponsiveService.threadIsOpen = true
    this.threadService.threadChatText = chatText;
    this.threadService.threadChatloginName = chatloginName;
    this.threadService.threadChatTime = chatTime;
    this.threadService.threadUserMail = usermail;
    this.threadService.threadUserImg = userImg;
    this.threadService.threadChatImage = chatImage
    document.getElementById('message-field-thread')?.focus();

    if(window.innerWidth < 1300 && channelChatWindow && workspaceMenu){
      channelChatWindow.style.display = 'none';
      workspaceMenu.style.display = 'none';
      this.ResponsiveService.threadOpenAndWithUnder1300px = true;
    }
  }

  /**
 * Displays the profile of a user.
 * @param {string} loginnames - The login name of the user whose profile is being viewed.
 * @param {string} usermail - The email address of the user whose profile is being viewed.
 * @param {string} userImg - The URL of the image associated with the user's profile.
 */
  showProfil(loginnames: string, usermail: string, userImg: string) {
    this.firestoreService.loginName = loginnames;
    this.firestoreService.userMail = usermail;
    this.firestoreService.userImage = userImg;
    const onlinestatus = this.authService.getUserOnlineStatus(usermail)
    this.firestoreService.userOnlineStatus = onlinestatus!
    setTimeout(() => {
      this.openDialog();
    }, 200);
  }

  openDialog() {
    this.dialog.open(DialogProfileViewComponent, {
      panelClass: 'profile-view-dialog-responsive',
    });
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

  /**
 * Opens a dialog window for adding users to a channel.
 * If the window width is less than 550 pixels, opens the user list instead.
 */
  openUserList() {

    this.dialog.open(DialogChatUserlistComponent, {
      position: {
        top: '190px',
        right: '690px',
      },
      panelClass: ['custom-container', 'open-user-dialog-responsive'],
    });
  }

  /**
 * Stops the propagation of the given event.
 * 
 * @param {any} event - The event object to stop propagation for.
 */
  onEvent(event: any) {
    event.stopPropagation();
  }

  /**
 * Retrieves the count of answers in a specified chat thread.
 * @param {string} chatID - The ID of the chat thread to retrieve the answer count for.
 * @returns {number} The count of answers in the specified chat thread.
 */
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


  /**
   * Retrieves the timestamp of the last answer in a specified chat thread.
   * @param {string} chatID - The ID of the chat thread to retrieve the last answer time for.
   * @returns {any} The timestamp of the last answer in the specified chat thread, or undefined if no answer is found.
   */
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


}
