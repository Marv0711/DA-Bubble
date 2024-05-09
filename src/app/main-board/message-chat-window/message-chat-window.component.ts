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
import { MatMenuModule } from '@angular/material/menu';
import { ChatService } from '../../../services/chat.service';
import { EmojiService } from '../../../services/emoji.service';
import { privatChat } from '../../../models/privatChat.class';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-message-chat-window',
  standalone: true,
  templateUrl: './message-chat-window.component.html',
  styleUrl: './message-chat-window.component.scss',
  imports: [FormsModule, MatMenuModule, MatIconModule, MessageFieldComponent, CommonModule, DialogProfileViewComponent, ChannelChatWindowComponent, PickerModule, PrivatMessageFieldComponent]
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
  privateChatImage: string = ''
  privateChatMail: string = ''
  privateChatList: any[] = []
  newText: string[] = [];


  constructor(public threadService: ThreadService,
    public dialog: MatDialog,
    public emojiService: EmojiService, public firestoreService: FirestoreServiceService,
    public chatService: ChatService,
    public authentication: AuthenticationService,
    public storageService: StorageService) { }

  /**
 * Prevents the propagation of the event.
 * @param event The event object.
 */
  dontclose(event: Event) {
    event.stopPropagation();
  };

  /**
 * Prepares a chat message for editing.
 * It sets the 'editOpen' property of the chat message object to true,
 * enabling the editing interface, and populates the newText array
 * with the current message content for editing.
 * @param {any} chat - The chat message object to be edited.
 * @param {number} i - The index of the chat message in the array.
 */
  setEditChat(chat: any, i: number) {
    chat.editOpen = true;
    this.newText[i] = chat.textAreaInput;
  }

  /**
 * Edits a chat message with new text content.
 * It updates the chat message through the chat service,
 * updates the thread chat text in the thread service,
 * clears the edited text content from the newText array,
 * and closes the editing interface for the chat message.
 * @param {any} chat - The chat message object being edited.
 * @param {string} chatID - The ID of the chat message being edited.
 * @param {number} i - The index of the chat message in the newText array.
 */
  EditChat(chat: any, chatID: string, i: number) {
    let newText = this.newText[i]
    this.chatService.editChat(chatID, 'chat', newText);
    this.threadService.threadChatText = newText;
    this.newText[i] = '';
    chat.editOpen = false;
  }

  /**
 * Cancels the editing of a chat message.
 * It closes the editing interface by setting the 'editOpen' property of the chat message to false,
 * and clears any edited text content from the newText array.
 * @param {number} i - The index of the chat message being edited.
 * @param {any} chat - The chat message object being edited.
 */
  noEditChat(i: number, chat: any) {
    chat.editOpen = false;
    this.newText[i] = '';
  }

  /**
 * Opens a dialog for profile view.
 */
  openDialog(loginname: string, usermail: string, userImg: string) {
    this.firestoreService.loginName = loginname;
    this.firestoreService.userMail = usermail;
    this.firestoreService.userImage = userImg;
    this.firestoreService.userOnlineStatus = this.authentication.getUserOnlineStatus(usermail)
    setTimeout(() => {
      this.dialog.open(DialogProfileViewComponent, {
        panelClass: 'profile-view-dialog-responsive',
      });
    }, 200);

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
  async sendMessageToPrivateChat() {
    if (this.storageService.privateChatImageUrl) {
      await this.uploadImg()
    }
    this.setChatData()
    this.scrollToPost(100)
    this.storageService.resetData()
    this.privateChatImage = ''
  }

  /**
 * Sets the data for a private chat message and saves it.
 * It retrieves the current time, sets the chat message properties including
 * the text input, login name, profile image, chat time, members, and chat image,
 * then saves the private chat message using the chat service.
 * Finally, it clears the text input.
 */
  setChatData() {
    let newTime = new Date()
    let member = [this.firestoreService.currentUser.email, this.chatService.currentContactUser.mail]
    this.chatService.privatChat.textAreaInput = this.textAreaInput;
    this.chatService.privatChat.loginName = this.authentication.currentUser.displayName;
    this.chatService.privatChat.profileImg = this.authentication.currentUser.photoURL;
    this.chatService.privatChat.chatTime = newTime.getTime();
    this.chatService.privatChat.member = member;
    this.chatService.privatChat.chatImage = this.privateChatImage;
    this.chatService.privatChat.mail = this.authentication.currentUser.mail
    this.chatService.savePrivateChat();
    this.textAreaInput = '';
  }

  /**
 * Scrolls to the bottom of the chat container after a specified timeout.
 * It waits for the specified timeout duration and then scrolls the chat container
 * to the bottom smoothly.
 * @param {number} timeout - The duration to wait before scrolling, in milliseconds.
 */
  scrollToPost(timeout: number) {
    setTimeout(() => {
      document.getElementById('chat-container')?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, timeout);
  }

  /**
 * Uploads an image for the private chat.
 * 
 * It attempts to upload the image using the Storage Service by calling 'uploadFile' 
 * with the specified path to the 'privateChatImages/' folder.
 * If the upload is successful, it retrieves the URL of the uploaded image using 'getStorageUrl' 
 * from the Storage Service and assigns it to the 'privateChatImage' variable.
 * If an error occurs during the upload process, it displays an alert to prompt the user to try again.
 * 
 * @param {number} timeout - The duration to wait before scrolling, in milliseconds.
 */
  async uploadImg() {
    try {
      const path = await this.storageService.uploadFile('privateChatImages/')
      const url = await this.storageService.getStorageUrl(path)
      this.privateChatImage = url
    } catch (error) {
      alert('somthing went wrong with the File upload, try again')
    }
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
 * Displays the profile of a user.
 * @param {string} loginnames - The login name of the user whose profile is being viewed.
 * @param {string} usermail - The email address of the user whose profile is being viewed.
 * @param {string} userImg - The URL of the image associated with the user's profile.
 */
  showProfil(loginnames: string, usermail: string, userImg: string) {
    this.firestoreService.loginName = loginnames;
    this.firestoreService.userMail = usermail;
    this.firestoreService.userImage = userImg;
    const onlinestatus = this.authentication.getUserOnlineStatus(usermail)
    this.firestoreService.userOnlineStatus = onlinestatus!
    this.openDialog(loginnames, usermail, userImg);
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
    if(chat.showEmojiPicker){
      this.chatService.emojiPickerIsOpen = true;
      this.chatService.openChat = chat;
    }else{
      this.chatService.emojiPickerIsOpen = false;
    }
  }

}
