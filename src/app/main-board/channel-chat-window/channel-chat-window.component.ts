import { Component } from '@angular/core';
import { MessageFieldComponent } from "../message-field/message-field.component";
import { DialogEditChannelComponent } from '../dialog-edit-channel/dialog-edit-channel.component';
import { MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-channel-chat-window',
    standalone: true,
    templateUrl: './channel-chat-window.component.html',
    styleUrl: './channel-chat-window.component.scss',
    imports: [MessageFieldComponent]
})
export class ChannelChatWindowComponent {

    constructor(public dialog: MatDialog) {}

    openEditChannel() {
        this.dialog.open(DialogEditChannelComponent);

    }

}
