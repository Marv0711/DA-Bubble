import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { CloseEmojiService } from '../../close-emoji.service';

@Component({
  selector: 'app-message-field',
  standalone: true,
  imports: [MatIconModule,PickerModule,FormsModule,CommonModule,],
  templateUrl: './message-field.component.html',
  styleUrl: './message-field.component.scss'
})
export class MessageFieldComponent {
  constructor(public CloseEmojiService: CloseEmojiService){}
  public textAreaInput:string = '';

  addEmoji(event:any){
    this.textAreaInput = `${this.textAreaInput}${event.emoji.native}`;
    this.CloseEmojiService.isEmojiPickerVisible = false;
  }

  closeEmojiField(){
    this.CloseEmojiService.isEmojiPickerVisible = false;
  }

}
