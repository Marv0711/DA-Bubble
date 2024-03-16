import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { CloseEmojiService } from '../../../../services/close-emoji.service';
import { FirestoreServiceService } from '../../../../services/firestore-service.service';
import { AuthenticationService } from '../../../../services/authentication.service';

@Component({
  selector: 'app-privat-message-field',
  standalone: true,
  imports: [MatIconModule,PickerModule,FormsModule,CommonModule,],
  templateUrl: './privat-message-field.component.html',
  styleUrl: './privat-message-field.component.scss'
})
export class PrivatMessageFieldComponent {

  public textAreaInput:string = '';
  chatTime:Date =  new Date();
  chatDate:Date = new Date();
  

  constructor(public CloseEmojiService: CloseEmojiService, public chatService: FirestoreServiceService, public authentication: AuthenticationService){ }


  addEmoji(event:any){
    this.textAreaInput = `${this.textAreaInput}${event.emoji.native}`;
    this.CloseEmojiService.isEmojiPickerVisible = false;
  }

  closeEmojiField(){
    this.CloseEmojiService.isEmojiPickerVisible = false;
  }

  sendMessageToPrivatChat() {
    let member = [this.chatService.currentUser.email, this.chatService.currentContactUser.mail]

    this.chatService.privatChat.textAreaInput = this.textAreaInput;
    this.chatService.privatChat.loginName = this.authentication.currentUser.displayName;
    this.chatService.privatChat.chatTime = this.chatTime.getTime();
    this.chatService.privatChat.member = member;

    this.chatService.savePrivateChat();
    this.textAreaInput = '';
    
    setTimeout(() => {
      document.getElementById('chat-container')?.scrollIntoView({behavior: "smooth", block: "end"});
    }, 100);
  }

}
