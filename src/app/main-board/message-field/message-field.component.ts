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


  constructor(public emojiService: EmojiService,
    public chatService: ChatService,
    public authentication: AuthenticationService,
    private firestoreService: FirestoreServiceService,
    public channelService: ChannelService) { }

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
  sendMessageToChat() {
    // Get the current time
    let newTime = new Date();
    // Set the properties of the chat message
    this.chatService.chat.textAreaInput = this.textAreaInput;
    this.chatService.chat.id = this.channelService.channelID;
    this.chatService.chat.loginName = this.authentication.currentUser.displayName;
    this.chatService.chat.profileImg = this.authentication.currentUser.photoURL;
    this.chatService.chat.mail = this.authentication.currentUser.email;
    // Set the time of the chat in milliseconds
    this.chatService.chat.Time = newTime.getTime();
    this.chatService.chat.Date = newTime.getTime();
    // Save the chat message
    this.chatService.saveChat();
    // Clear the input area
    this.textAreaInput = '';

    // Scroll to the bottom of the chat container after a short delay
    setTimeout(() => {
      document.getElementById('chat-container')?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);

  }

}
