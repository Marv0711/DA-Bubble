import { Component } from '@angular/core';
import { MessageFieldComponent } from "../message-field/message-field.component";

@Component({
    selector: 'app-channel-chat-window',
    standalone: true,
    templateUrl: './channel-chat-window.component.html',
    styleUrl: './channel-chat-window.component.scss',
    imports: [MessageFieldComponent]
})
export class ChannelChatWindowComponent {

}
