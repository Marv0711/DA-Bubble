import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { ThreadService } from '../../../services/thread.service';
import { EmojiService } from '../../../services/emoji.service';

@Component({
  selector: 'app-thread-message-field',
  standalone: true,
  imports: [MatIconModule, PickerModule, FormsModule, CommonModule,],
  templateUrl: './thread-message-field.component.html',
  styleUrl: './thread-message-field.component.scss'
})
export class ThreadMessageFieldComponent {
  threadTime: Date = new Date();
  threadDate: Date = new Date();
  public threadAreaInput: string = '';


  constructor(public threadService: ThreadService, public emojiService: EmojiService, public chatService: FirestoreServiceService, public authentication: AuthenticationService) { }


  addEmojis(event: any) {
    this.threadAreaInput = `${this.threadAreaInput}${event.emoji.native}`;
    this.emojiService.isEmojisPickerVisible = false;
  }

  closeEmojisField() {
    this.emojiService.isEmojisPickerVisible = false;
  }

  sendMessageToThread() {
    this.threadService.ThreadAnswer.threadAreaInput = this.threadAreaInput;
    this.threadService.ThreadAnswer.loginName = this.authentication.currentUser.displayName;
    this.threadService.ThreadAnswer.threadTime = this.threadTime.getTime();
    this.threadService.ThreadAnswer.threadDate = this.threadDate.getTime();
    this.threadService.ThreadAnswer.id = this.threadService.currentChatID;
    this.threadService.ThreadAnswer.mail = this.authentication.currentUser.email;
    this.threadService.ThreadAnswer.profileImg = this.authentication.currentUser.photoURL;
    this.threadService.saveThreadAnswer();
    this.threadAreaInput = '';

    setTimeout(() => {
      document.getElementById('chat-container')?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
  }

}
