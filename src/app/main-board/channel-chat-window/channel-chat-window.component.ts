import { Component } from '@angular/core';
import { MessageFieldComponent } from "../message-field/message-field.component";
import { DialogEditChannelComponent } from '../dialog-edit-channel/dialog-edit-channel.component';
import { MatDialog} from '@angular/material/dialog';
import { CloseEmojiService } from '../../../services/close-emoji.service';
import { DialogAddUserToChannelComponent } from '../dialog-add-user-to-channel/dialog-add-user-to-channel.component';
import { DialogChatUserlistComponent } from '../dialog-chat-userlist/dialog-chat-userlist.component';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-channel-chat-window',
    standalone: true,
    templateUrl: './channel-chat-window.component.html',
    styleUrl: './channel-chat-window.component.scss',
    imports: [MessageFieldComponent, CommonModule]
})
export class ChannelChatWindowComponent {
    isHovered: boolean = false;

    constructor(public dialog: MatDialog, public CloseEmojiService: CloseEmojiService, public chatService: FirestoreServiceService) {}

    openEditChannel() {
        this.dialog.open(DialogEditChannelComponent);

    }

    dontclose(event:Event){
        event.stopPropagation();
    }

    openAddUserdialog() {
        this.dialog.open(DialogAddUserToChannelComponent,{
            position: {
                top: '190px',
                right: '590px',
            },
            panelClass: ['custom-container', 'add-user-dialog-responsive'],
            backdropClass: 'backdrop-add-user-dialog' 
        });
    }

    openUserList() {
        this.dialog.open(DialogChatUserlistComponent,{
            position: {
                top: '240px',
                right: '620px',
            },
            panelClass: 'custom-container' 
        });
    }

}
