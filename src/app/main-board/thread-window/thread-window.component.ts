import { Component, Input } from '@angular/core';
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



@Component({
  selector: 'app-thread-window',
  standalone: true,
  templateUrl: './thread-window.component.html',
  styleUrl: './thread-window.component.scss',
  imports: [CommonModule, ThreadMessageFieldComponent, MatIconModule, PickerModule]
})
export class ThreadWindowComponent {

  constructor(public threadService: ThreadService,
    private authService: AuthenticationService,
    public dialog: MatDialog,
    public chatService: FirestoreServiceService,
    public channelService: ChannelService,
    public emojiService: EmojiService) {
  }

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
    this.dialog.open(DialogProfileViewComponent);
  }

  /**
  * Closes the thread by hiding its corresponding element in the DOM.
  */
  closeThread() {
    document.getElementById('threat')?.classList.add('d-none');
  }

  /**
  * Prevents the propagation of the event.
  * @param event The event object.
  */
  dontclose(event: Event) {
    event.stopPropagation();
  }

  /**
 * Increases the emoji amount for a specific emoji in a chat.
 * 
 * @param {any} emoji - The emoji object.
 * @param {string} chatID - The ID of the chat.
 * @param {number} i - Index or identifier of the emoji.
 */
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

  /**
 * Stops the propagation of the given event.
 * 
 * @param {any} event - The event object to stop propagation for.
 */
  onEvent(event: any) {
    event.stopPropagation();
  }

  /**
 * Toggles the visibility of the emoji picker for a given chat.
 * 
 * @param {any} chat - The chat object.
 */
  toggleEmojiPicker(chat: any) {
    chat.showEmojiPicker = !chat.showEmojiPicker;
  }

  /**
 * Opens a thread chat with the provided details.
 * 
 * @param {string} chatId - The ID of the chat.
 * @param {string} chatText - The text of the chat.
 * @param {string} chatloginName - The login name associated with the chat.
 * @param {string} chatTime - The time of the chat.
 * @param {string} usermail - The email of the user associated with the chat.
 * @param {string} userImg - The image of the user associated with the chat.
 * @param {string} chatImage - The image associated with the chat.
 */
  openThreadChat(chatId: string, chatText: string, chatloginName: string, chatTime: string, usermail: string, userImg: string, chatImage: string) {
    document.getElementById('threat')?.classList.remove('d-none');
    this.threadService.threadChatText = chatText;
    this.threadService.threadChatloginName = chatloginName;
    this.threadService.threadChatTime = chatTime;
    this.threadService.threadUserMail = usermail;
    this.threadService.threadUserImg = userImg;
    this.threadService.threadChatImage = chatImage;
  }

  /**
 * Closes the emoji field reaction.
 */
  closeEmojiFieldReaction() {
    this.emojiService.isEmojiPickerVisibleReaction = false;
  }

  /**
 * Adds an emoji to the chat.
 *
 * @param {any} event - The event object containing the selected emoji.
 * @param {string} chatID - The ID of the chat where the emoji will be added.
 */
  addEmoji(event: any, chatID: string) {
    this.emojiService.addEmojiInChat(event.emoji.native, chatID, 'thread')
  }

}

