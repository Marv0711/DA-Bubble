import { Component } from '@angular/core';
import { MessageFieldComponent } from "../message-field/message-field.component";
import { DialogEditChannelComponent } from '../dialog-edit-channel/dialog-edit-channel.component';
import { MatDialog } from '@angular/material/dialog';
import { CloseEmojiService } from '../../../services/close-emoji.service';
import { DialogAddUserToChannelComponent } from '../dialog-add-user-to-channel/dialog-add-user-to-channel.component';
import { DialogChatUserlistComponent } from '../dialog-chat-userlist/dialog-chat-userlist.component';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Chat } from '../../../models/chat.class';
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { DialogProfileViewComponent } from '../dialog-profile-view/dialog-profile-view.component';
import { ChannelChatHeaderComponent } from "./channel-chat-header/channel-chat-header.component";



@Component({
    selector: 'app-channel-chat-window',
    standalone: true,
    templateUrl: './channel-chat-window.component.html',
    styleUrl: './channel-chat-window.component.scss',
    imports: [MessageFieldComponent, CommonModule, MatIconModule, PickerModule, ChannelChatHeaderComponent]
})
export class ChannelChatWindowComponent {


    constructor(public dialog: MatDialog, public CloseEmojiService: CloseEmojiService, public chatService: FirestoreServiceService) { }

    addEmoji(event: any, chatID:string) {
        this.chatService.addEmojiInChat(event.emoji.native, chatID)
    }

    toggleEmojiPicker(chat: any) {
        chat.showEmojiPicker = !chat.showEmojiPicker;
    }

    showEmojiPicker(chat: any) {
        chat.showEmojiPicker = true;
    }

    hideEmojiPicker(chat: any) {
        chat.showEmojiPicker = false;
    }

    closeEmojiFieldReaction() {
        this.CloseEmojiService.isEmojiPickerVisibleReaction = false;
    }

    emojiAmountUp(emoji: any, chatID: string, i: number) {
        let value;

        if (emoji['likerMail'].includes(this.chatService.currentUser.email)) {
            value = -1;
        }
        else {
            value = 1;
        }

        this.chatService.UpdateEmojiAmount(chatID, value, i)
    }

    dontclose(event: Event) {
        event.stopPropagation();
    }

    openThreadChat(chatId: string, chatText: string, chatloginName: string, chatTime: string) {
        document.getElementById('threat')?.classList.remove('d-none');
        this.chatService.threadChatText = chatText;
        this.chatService.threadChatloginName = chatloginName;
        this.chatService.threadChatTime = chatTime;
        console.log(chatId);
    }

    showProfil() {
        this.dialog.open(DialogProfileViewComponent);
    }



}
