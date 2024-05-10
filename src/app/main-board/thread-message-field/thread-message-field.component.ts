import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { ThreadService } from '../../../services/thread.service';
import { EmojiService } from '../../../services/emoji.service';
import { StorageService } from '../../../services/storage.service';
import { ChannelService } from '../../../services/channel.service';

@Component({
  selector: 'app-thread-message-field',
  standalone: true,
  imports: [MatIconModule, PickerModule, FormsModule, CommonModule,],
  templateUrl: './thread-message-field.component.html',
  styleUrl: './thread-message-field.component.scss'
})
export class ThreadMessageFieldComponent {
  // Initialize threadTime and threadDate variables with current date and time
  time: Date = new Date();
  date: Date = new Date();

  threadImage: string = ''
  public threadAreaInput: string = '';


  constructor(public threadService: ThreadService,
    public emojiService: EmojiService,
    public channelService: ChannelService,
    public chatService: FirestoreServiceService,
    public authentication: AuthenticationService,
    public storageService: StorageService,
    public firestoreService: FirestoreServiceService,
    private elRef: ElementRef) { }

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
    if (this.storageService.threadImageUrl || this.threadAreaInput.length > 1){
    if (this.storageService.threadImageUrl) {
      await this.uploadImg()
    }
    this.setThreadData()
    this.scrollToPost(100)
    this.storageService.resetData()
    this.threadImage = ''
  }
  }

  /**
 * Sets thread data and saves the thread answer.
 */
  setThreadData() {
    let newTime = new Date();
    this.threadService.ThreadAnswer.threadAreaInput = this.threadAreaInput;
    this.threadService.ThreadAnswer.channelName = this.channelService.channelName;
    this.threadService.ThreadAnswer.id = this.threadService.currentChatID;
    this.threadService.ThreadAnswer.loginName = this.authentication.currentUser.displayName;
    this.threadService.ThreadAnswer.profileImg = this.authentication.currentUser.photoURL;
    this.threadService.ThreadAnswer.mail = this.authentication.currentUser.email;
    this.threadService.ThreadAnswer.time = newTime.getTime();
    this.threadService.ThreadAnswer.date = newTime.getTime();
    this.threadService.ThreadAnswer.threadImage = this.threadImage;
    this.threadService.saveThreadAnswer();
    this.threadAreaInput = '';
  }

  /**
 * Uploads an image file for the thread.
 */
  async uploadImg() {
    try {
      const path = await this.storageService.uploadFile('threadImages/')
      const url = await this.storageService.getStorageUrl(path)
      this.threadImage = url
    } catch (error) {
      alert('somthing went wrong with the File upload, try again')
    }
  }

  /**
 * Scrolls to the post section after a specified timeout.
 * 
 * @param {number} timeout - The timeout duration in milliseconds.
 */
  scrollToPost(timeout: number) {
    setTimeout(() => {
      document.getElementById('chat-container')?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, timeout);
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
    this.threadAreaInput += `@${name}`
    this.toggleUserList()
  }

  markChanelNameThread(chanel: string) {
    let close = document.getElementById('channelListThread');

    this.threadAreaInput += `${chanel}`
    close?.classList.add('d-none');
  }

  removeSpaces(str: string): string {
    return str.replace(/\s/g, ''); // Diese Methode entfernt alle Leerzeichen aus dem übergebenen String
  }

  checkForAtSymbolThread() {
    if (this.threadAreaInput.includes('@')) {
      this.toggleUserList();
      this.threadAreaInput = this.threadAreaInput.substring(1);
    } else {
      this.userListDisplay = 'none'
    }
  }

  checkForRouteSymbolThread() {
    let channelList = document.getElementById('channelListThread');

    if(this.threadAreaInput.includes('#')) {
      channelList?.classList.remove('d-none');
      console.log(this.channelService.channelListNamesArray)
    }else {
      channelList?.classList.add('d-none');
    }
  }

}
