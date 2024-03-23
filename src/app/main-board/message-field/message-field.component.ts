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

@Component({
  selector: 'app-message-field',
  standalone: true,
  imports: [MatIconModule, PickerModule, FormsModule, CommonModule,],
  templateUrl: './message-field.component.html',
  styleUrl: './message-field.component.scss'
})
export class MessageFieldComponent {
  public textAreaInput: string = '';
  chatTime: Date = new Date();
  chatDate: Date = new Date();


  constructor(public emojiService: EmojiService,
    public chatService: ChatService,
    public authentication: AuthenticationService,
    private firestoreService: FirestoreServiceService,
    public channelService: ChannelService) { }


  addEmoji(event: any) {
    this.textAreaInput = `${this.textAreaInput}${event.emoji.native}`;
    this.emojiService.isEmojiPickerVisible = false;
  }

  closeEmojiField() {
    this.emojiService.isEmojiPickerVisible = false;
  }

  sendMessageToChat() {
    let newTime = new Date();

    this.chatService.chat.textAreaInput = this.textAreaInput;
    this.chatService.chat.id = this.channelService.channelID;
    this.chatService.chat.loginName = this.authentication.currentUser.displayName;
    this.chatService.chat.profileImg = this.authentication.currentUser.photoURL;
    this.chatService.chat.mail = this.authentication.currentUser.email;
    this.chatService.chat.chatTime = newTime.getTime();
    this.chatService.chat.chatDate = newTime.getTime();
    this.chatService.saveChat();
    this.textAreaInput = '';

    setTimeout(() => {
      document.getElementById('chat-container')?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);

  }

}
