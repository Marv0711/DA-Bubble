import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirestoreServiceService } from '../../../../services/firestore-service.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { ChatService } from '../../../../services/chat.service';
import { EmojiService } from '../../../../services/emoji.service';
import { StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'app-privat-message-field',
  standalone: true,
  imports: [MatIconModule, PickerModule, FormsModule, CommonModule,],
  templateUrl: './privat-message-field.component.html',
  styleUrl: './privat-message-field.component.scss'
})
export class PrivatMessageFieldComponent {

  public textAreaInput: string = '';
  chatTime: Date = new Date();
  chatDate: Date = new Date();
  privateChatImage: string = ''

  constructor(public emojiService: EmojiService, public firestoreService: FirestoreServiceService,
    public chatService: ChatService,
    public authentication: AuthenticationService,
    public storageService: StorageService) { }


  addEmoji(event: any) {
    this.textAreaInput = `${this.textAreaInput}${event.emoji.native}`;
    this.emojiService.isEmojiPickerVisible = false;
  }

  closeEmojiField() {
    this.emojiService.isEmojiPickerVisible = false;
  }

  async sendMessageToPrivateChat() {
    if (this.storageService.privateChatImageUrl) {
      await this.uploadImg()
    }
    this.setChatData()
    this.scrollToPost(100)
    this.storageService.resetData()
    this.privateChatImage = ''
  }

  setChatData() {
    let newTime = new Date()
    let member = [this.firestoreService.currentUser.email, this.chatService.currentContactUser.mail]

    this.chatService.privatChat.textAreaInput = this.textAreaInput;
    this.chatService.privatChat.loginName = this.authentication.currentUser.displayName;
    this.chatService.privatChat.profileImg = this.authentication.currentUser.photoURL;
    this.chatService.privatChat.chatTime = newTime.getTime();
    this.chatService.privatChat.member = member;
    this.chatService.privatChat.chatImage = this.privateChatImage;
    this.chatService.savePrivateChat();
    this.textAreaInput = '';
  }

  scrollToPost(timeout: number) {
    setTimeout(() => {
      document.getElementById('chat-container')?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, timeout);
  }

  async uploadImg() {
    try {
      const path = await this.storageService.uploadFile('privateChatImages/')
      const url = await this.storageService.getStorageUrl(path)
      this.privateChatImage = url
    } catch (error) {
      alert('somthing went wrong with the File upload, try again')
    }
  }


}
