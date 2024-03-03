import { Component} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { CloseEmojiService } from '../../../services/close-emoji.service';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-message-field',
  standalone: true,
  imports: [MatIconModule,PickerModule,FormsModule,CommonModule,],
  templateUrl: './message-field.component.html',
  styleUrl: './message-field.component.scss'
})
export class MessageFieldComponent {
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

  sendMessageToChat() {
    this.chatService.chat.textAreaInput = this.textAreaInput;
    this.chatService.chat.id = this.chatService.channelID;
    this.chatService.chat.loginName = this.authentication.currentUser.displayName;
    this.chatService.chat.chatTime = this.chatTime.getTime();
    this.chatService.chat.chatDate = this.chatDate.getTime();
    this.chatService.saveChat();
    this.textAreaInput = '';
    
    setTimeout(() => {
      document.getElementById('chat-container')?.scrollIntoView({behavior: "smooth", block: "end"});
    }, 100);
    
  }

}
