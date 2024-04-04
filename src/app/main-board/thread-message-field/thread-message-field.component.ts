import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { ThreadService } from '../../../services/thread.service';
import { EmojiService } from '../../../services/emoji.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-thread-message-field',
  standalone: true,
  imports: [MatIconModule, PickerModule, FormsModule, CommonModule,],
  templateUrl: './thread-message-field.component.html',
  styleUrl: './thread-message-field.component.scss'
})
export class ThreadMessageFieldComponent {
  // Initialize threadTime and threadDate variables with current date and time
  Time: Date = new Date();
  Date: Date = new Date();

  threadImage: string = ''
  public threadAreaInput: string = '';


  constructor(public threadService: ThreadService,
    public emojiService: EmojiService,
    public chatService: FirestoreServiceService,
    public authentication: AuthenticationService,
    public storageService: StorageService) { }

  /**
  * Adds the selected emoji to the input area and hides the emoji picker.
  * @param event The event containing information about the selected emoji.
  */
  addEmojis(event: any) {
    this.threadAreaInput = `${this.threadAreaInput}${event.emoji.native}`;
    this.emojiService.isEmojisPickerVisible = false;
  }

  /**
  * Closes the emoji picker field by hiding it.
  */
  closeEmojisField() {
    this.emojiService.isEmojisPickerVisible = false;
  }

  /**
  * Sends a message to the current thread.
  */
  async sendMessageToThread() {

    if (this.threadAreaInput.length > 1) {
      if (this.storageService.threadImageUrl) {
        await this.uploadImg()
      }
      this.setThreadData()
      this.scrollToPost(100)
      this.storageService.resetData()
      this.threadImage = ''
    }

  }


  setThreadData() {
    let newTime = new Date();
    this.threadService.ThreadAnswer.threadAreaInput = this.threadAreaInput;
    this.threadService.ThreadAnswer.id = this.threadService.currentChatID;
    this.threadService.ThreadAnswer.loginName = this.authentication.currentUser.displayName;
    this.threadService.ThreadAnswer.profileImg = this.authentication.currentUser.photoURL;
    this.threadService.ThreadAnswer.mail = this.authentication.currentUser.email;
    this.threadService.ThreadAnswer.Time = newTime.getTime();
    this.threadService.ThreadAnswer.Date = newTime.getTime();
    this.threadService.ThreadAnswer.threadImage = this.threadImage;
    this.threadService.saveThreadAnswer();
    this.threadAreaInput = '';
  }

  async uploadImg() {
    try {
      const path = await this.storageService.uploadFile('threadImages/')
      const url = await this.storageService.getStorageUrl(path)
      this.threadImage = url
    } catch (error) {
      alert('somthing went wrong with the File upload, try again')
    }
  }

  scrollToPost(timeout: number) {
    setTimeout(() => {
      document.getElementById('chat-container')?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, timeout);
  }


}
