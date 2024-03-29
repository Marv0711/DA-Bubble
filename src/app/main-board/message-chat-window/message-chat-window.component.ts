import { Component } from '@angular/core';
import { MessageFieldComponent } from '../message-field/message-field.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
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

import { ChatService } from '../../../services/chat.service';
import { EmojiService } from '../../../services/emoji.service';
import { privatChat } from '../../../models/privatChat.class';

@Component({
  selector: 'app-message-chat-window',
  standalone: true,
  templateUrl: './message-chat-window.component.html',
  styleUrl: './message-chat-window.component.scss',
  imports: [FormsModule, MatIconModule, MessageFieldComponent, CommonModule, DialogProfileViewComponent, ChannelChatWindowComponent, PickerModule, PrivatMessageFieldComponent]
})
export class MessageChatWindowComponent {
  // Initialize a new instance of the Chat model
  chatModel = new Chat();
  // Initialize the input area for typing messages as an empty string
  public textAreaInput: string = '';
  // Initialize chatTime and chatDate variables with the current date and time
  // Represents the time of the chat
  chatTime: Date = new Date();
  // Represents the date of the chat
  chatDate: Date = new Date();

  constructor(public threadService: ThreadService,
    public dialog: MatDialog,
    public emojiService: EmojiService, public firestoreService: FirestoreServiceService,
    public chatService: ChatService,
    public authentication: AuthenticationService) { }

  /**
 * Prevents the propagation of the event.
 * @param event The event object.
 */
  dontclose(event: Event) {
    event.stopPropagation();
  };

  /**
 * Opens a dialog for profile view.
 */
  openDialog() {
    this.dialog.open(DialogProfileViewComponent, {
      panelClass: 'profile-view-dialog-responsive',
    });
  }

  /**
 * Adds an emoji to a private chat message.
 * @param event The event containing information about the selected emoji.
 * @param chatID The ID of the private chat where the emoji is added.
 */
  addEmoji(event: any, chatID: string) {
    this.emojiService.addEmojiInChat(event.emoji.native, chatID, 'privatChat')
  }

  /**
 * Closes the emoji field by setting the visibility of the emoji picker to false.
 */
  closeEmojiField() {
    this.emojiService.isEmojiPickerVisible = false;
  }

  /**
 * Sends a message to a private chat.
 */
  sendMessageToPrivatChat() {
    // Determine the members of the private chat
    let member = [this.firestoreService.currentUser.email, this.chatService.currentContactUser.mail]
    // Set the properties of the private chat in the chat service
    this.chatService.privatChat.textAreaInput = this.textAreaInput;
    this.chatService.privatChat.loginName = this.authentication.currentUser.displayName;
    this.chatService.privatChat.chatTime = this.chatTime.getTime();
    this.chatService.privatChat.member = member;
    // Save the private chat
    this.chatService.savePrivateChat();
    // Clear the input area
    this.textAreaInput = '';
    // Scroll to the bottom of the chat container after a short delay
    setTimeout(() => {
      document.getElementById('chat-container')?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
  }

  //ChatWindow

  /**
 * Shows the emoji picker in the chat.
 * @param chat The chat object where the emoji picker is being shown.
 */
  showEmojiPicker(chat: any) {
    chat.showEmojiPicker = true;
  }

  /**
 * Hides the emoji picker in the chat.
 * @param chat The chat object where the emoji picker is being hidden.
 */
  hideEmojiPicker(chat: any) {
    chat.showEmojiPicker = false;
  }

  /**
 * Displays the profile view dialog for a user.
 * @param loginnames The login name of the user whose profile is being displayed.
 * @param usermail The email address of the user whose profile is being displayed.
 */
  showProfil(loginnames: string, usermail: string) {
    this.firestoreService.loginName = loginnames;
    this.firestoreService.userMail = usermail;
    this.dialog.open(DialogProfileViewComponent);
  }

  /**
 * Opens a thread chat.
 * @param chatId The ID of the chat.
 * @param chatText The text of the chat.
 * @param chatloginName The login name associated with the chat.
 * @param chatTime The time of the chat.
 */
  openThreadChat(chatId: string, chatText: string, chatloginName: string, chatTime: string, chatImage: string) {
    document.getElementById('threat')?.classList.remove('d-none');
    this.threadService.threadChatText = chatText;
    this.threadService.threadChatloginName = chatloginName;
    this.threadService.threadChatTime = chatTime;
    console.log(chatId);
  }

  /**
 * Closes the emoji field for reactions.
 * It sets the visibility of the emoji picker for reactions to false.
 */
  closeEmojiFieldReaction() {
    this.emojiService.isEmojiPickerVisibleReaction = false;
  }

  /**
 * Updates the emoji amount for a private chat.
 * @param emoji The emoji object.
 * @param chatID The ID of the private chat.
 * @param i The index of the emoji.
 */
  emojiAmountUp(emoji: any, chatID: string, i: number) {
    let value;

    if (emoji['likerMail'].includes(this.firestoreService.currentUser.email)) {
      value = -1;
    }
    else {
      value = 1;
    }

    this.emojiService.UpdatePrivatEmojiAmount(chatID, value, i)
  }

  /**
 * Prevents the propagation of the event.
 * @param event The event object.
 */
  onEvent(event: any) {
    event.stopPropagation();
  }

  /**
 * Toggles the visibility of the emoji picker in the chat.
 * @param chat The chat object.
 */
  toggleEmojiPicker(chat: any) {
    chat.showEmojiPicker = !chat.showEmojiPicker;
  }

}
