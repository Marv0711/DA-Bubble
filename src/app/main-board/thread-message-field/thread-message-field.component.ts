import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { CloseEmojiService } from '../../../services/close-emoji.service';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-thread-message-field',
  standalone: true,
  imports: [MatIconModule,PickerModule,FormsModule,CommonModule,],
  templateUrl: './thread-message-field.component.html',
  styleUrl: './thread-message-field.component.scss'
})
export class ThreadMessageFieldComponent {

  chatTime:Date =  new Date();
  chatDate:Date = new Date();
  public threadAreaInput:string = '';
  

  constructor(public CloseEmojiService: CloseEmojiService, public chatService: FirestoreServiceService, public authentication: AuthenticationService){ }


  addEmojis(event:any){
    this.threadAreaInput = `${this.threadAreaInput}${event.emoji.native}`;
    this.CloseEmojiService.isEmojisPickerVisible = false;
  }

  closeEmojisField(){
    this.CloseEmojiService.isEmojisPickerVisible = false;
  }

  sendMessageToThread() {
    this.chatService.ThreadAnswer.threadAreaInput = this.threadAreaInput;
    this.chatService.ThreadAnswer.loginName = this.authentication.currentUser.displayName;
    this.chatService.ThreadAnswer.threadTime = this.chatTime.getTime();
    this.chatService.ThreadAnswer.threadDate = this.chatDate.getTime();
    this.chatService.saveThreadAnswer();
    this.threadAreaInput = '';
    
    setTimeout(() => {
      document.getElementById('chat-container')?.scrollIntoView({behavior: "smooth", block: "end"});
    }, 100);
    
  }

}
