import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { ChatService } from '../../../services/chat.service';
import { EmojiService } from '../../../services/emoji.service';
import { ChannelService } from '../../../services/channel.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-message-field',
  standalone: true,
  imports: [MatIconModule, PickerModule, FormsModule, CommonModule,],
  templateUrl: './message-field.component.html',
  styleUrl: './message-field.component.scss'
})
export class MessageFieldComponent {
  /**
 * Represents the input area for typing messages.
 * Initialized as an empty string.
 */
  public textAreaInput: string = '';
  /**
 * Represents the time of the chat.
 * Initialized with the current date and time.
 */
  chatTime: Date = new Date();
  /**
 * Represents the date of the chat.
 * Initialized with the current date.
 */
  chatDate: Date = new Date();
  chatImage: string = ''


  constructor(public emojiService: EmojiService,
    public chatService: ChatService,
    public authentication: AuthenticationService,
    private firestoreService: FirestoreServiceService,
    public channelService: ChannelService,
    public storageService: StorageService) {
    // this.chatImage = 'https://firebasestorage.googleapis.com/v0/b/da-bubble-ba214.appspot.com/o/profileImages%2Fgast.png?alt=media&token=aa21542f-f455-4134-84dd-6c7b4bc10cc1'
  }

  /**
* Adds an emoji to the input area.
* @param event The event object containing the selected emoji.
*/
  addEmoji(event: any) {
    this.textAreaInput = `${this.textAreaInput}${event.emoji.native}`;
    this.emojiService.isEmojiPickerVisible = false;
  }

  /**
 * Closes the emoji field by hiding the emoji picker.
 */
  closeEmojiField() {
    this.emojiService.isEmojiPickerVisible = false;
  }

  /**
 * Sends a message to the chat.
 */
  async sendMessageToChat() {
    if (this.storageService.imageUrl) {
      await this.uploadImg()
    }
    this.setChatData()
    this.scrollToPost(100)
    this.storageService.resetData()
    this.chatImage = ''
  }

  setChatData() {
    let newTime = new Date();
    this.chatService.chat.textAreaInput = this.textAreaInput;
    this.chatService.chat.id = this.channelService.channelID;
    this.chatService.chat.loginName = this.authentication.currentUser.displayName;
    this.chatService.chat.profileImg = this.authentication.currentUser.photoURL;
    this.chatService.chat.mail = this.authentication.currentUser.email;
    this.chatService.chat.Time = newTime.getTime();
    this.chatService.chat.Date = newTime.getTime();
    this.chatService.chat.chatImage = this.chatImage;
    this.chatService.saveChat();
    this.textAreaInput = '';
  }

  scrollToPost(timeout: number) {
    setTimeout(() => {
      document.getElementById('chat-container')?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, timeout);
  }

  async uploadImg() {
    try {
      const path = await this.storageService.uploadFile('chatImages/')
      const url = await this.storageService.getStorageUrl(path)
      this.chatImage = url
    } catch (error) {
      alert('somthing went wrong with the File upload, try again')
    }
  }




}
