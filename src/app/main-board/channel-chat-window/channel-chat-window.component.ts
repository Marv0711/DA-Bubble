import { Component } from '@angular/core';
import { MessageFieldComponent } from "../message-field/message-field.component";
import { DialogEditChannelComponent } from '../dialog-edit-channel/dialog-edit-channel.component';
import { MatDialog } from '@angular/material/dialog';
import { CloseEmojiService } from '../../../services/close-emoji.service';
import { DialogAddUserToChannelComponent } from '../dialog-add-user-to-channel/dialog-add-user-to-channel.component';
import { DialogChatUserlistComponent } from '../dialog-chat-userlist/dialog-chat-userlist.component';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { CommonModule } from '@angular/common';
import { Chat } from '../../../models/chat.class';


@Component({
    selector: 'app-channel-chat-window',
    standalone: true,
    templateUrl: './channel-chat-window.component.html',
    styleUrl: './channel-chat-window.component.scss',
    imports: [MessageFieldComponent, CommonModule]
})
export class ChannelChatWindowComponent {
    chatModel = new Chat();
    constructor(public dialog: MatDialog, public CloseEmojiService: CloseEmojiService, public chatService: FirestoreServiceService) { }

    openEditChannel() {
        this.dialog.open(DialogEditChannelComponent, {
            panelClass: ['edit-channel-dialog-responsive'],
        });

    }

    dontclose(event: Event) {
        event.stopPropagation();
    }

    openAddUserdialog() {
        if (window.innerWidth < 550) {
            this.openUserList();
        } else {
            this.dialog.open(DialogAddUserToChannelComponent, {
                position: {
                    top: '190px',
                    right: '590px',
                },
                panelClass: ['custom-container', 'add-user-dialog-responsive'],
                backdropClass: 'backdrop-add-user-dialog'
            });
        }
    }

    openUserList() {
        this.dialog.open(DialogChatUserlistComponent, {
            position: {
                top: '190px',
                right: '690px',
            },
            panelClass: ['custom-container', 'open-user-dialog-responsive'],
        });
    }

    openThreadChat(chatId: string, chatText:string) {
        document.getElementById('threat')?.classList.remove('d-none');
        let chatRef = this.chatService.getChat(chatId);
        console.log(chatText);
    }

  

}
