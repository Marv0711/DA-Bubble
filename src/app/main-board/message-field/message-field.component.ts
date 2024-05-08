import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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

  lookingFor: string = '';

  constructor(public emojiService: EmojiService,
    public chatService: ChatService,
    public authentication: AuthenticationService,
    public firestoreService: FirestoreServiceService,
    public channelService: ChannelService,
    public storageService: StorageService,
    private elRef: ElementRef) {
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
    if (this.textAreaInput.length > 1) {
      if (this.storageService.imageUrl) {
        await this.uploadImg()
      }
      this.setChatData()
      this.scrollToPost(100)
      this.storageService.resetData()
      this.chatImage = ''
    }
  }

  /**
 * Sets chat data and saves the chat message.
 */
  setChatData() {
    let newTime = new Date();
    this.chatService.chat.textAreaInput = this.textAreaInput;
    this.chatService.chat.id = this.channelService.channelID;
    this.chatService.chat.loginName = this.authentication.currentUser.displayName;
    this.chatService.chat.profileImg = this.authentication.currentUser.photoURL;
    this.chatService.chat.mail = this.authentication.currentUser.email;
    this.chatService.chat.channelName = this.channelService.channelName;
    this.chatService.chat.time = newTime.getTime();
    this.chatService.chat.date = newTime.getTime();
    this.chatService.chat.chatImage = this.chatImage;
    this.chatService.saveChat();
    this.chatService.getAllChats();
    this.textAreaInput = '';
  }

  /**
 * Scrolls to a specific section in the chat container after a specified timeout duration.
 * 
 * @param {number} timeout - The timeout duration in milliseconds before scrolling occurs.
 */
  scrollToPost(timeout: number) {
    setTimeout(() => {
      document.getElementById('chat-container')?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, timeout);
  }

  /**
 * Uploads an image file for the chat.
 */
  async uploadImg() {
    try {
      const path = await this.storageService.uploadFile('chatImages/')
      const url = await this.storageService.getStorageUrl(path)
      this.chatImage = url
    } catch (error) {
      alert('somthing went wrong with the File upload, try again')
    }
  }


  @ViewChild('userlist')
  userList!: ElementRef; // Zugriff auf das DOM-Element mit der Bezeichnung 'userlist'
  userListDisplay: string = 'none'; // Anfangs wird die Benutzerliste ausgeblendet


  @HostListener('document:click', ['$event'])
  closeUserList(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.userListDisplay = 'none'; // Schließt die Benutzerliste, wenn der Benutzer irgendwo außerhalb davon klickt
    }
  }
  
  toggleUserList() {
    this.userListDisplay = this.userListDisplay === 'none' ? 'flex' : 'none'; // Toggle zwischen 'none' und 'flex'
  }

  markUserName(name: string) {
    this.textAreaInput += `@${name}`
    this.toggleUserList()
  }

  removeSpaces(str: string): string {
    return str.replace(/\s/g, ''); // Diese Methode entfernt alle Leerzeichen aus dem übergebenen String
  }

  checkForAtSymbol() {
    if (this.textAreaInput.includes('@')) {
      this.toggleUserList();
      this.textAreaInput = this.textAreaInput.substring(1);
    } 
  }
  
}
