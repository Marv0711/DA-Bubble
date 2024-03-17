import { Component } from '@angular/core';
import { ChannelChatHeaderComponent } from "../channel-chat-header/channel-chat-header.component";
import { ChannelChatWindowComponent } from "../channel-chat-window.component";

@Component({
    selector: 'app-channel-chat-complete',
    standalone: true,
    templateUrl: './channel-chat-complete.component.html',
    styleUrl: './channel-chat-complete.component.scss',
    imports: [ChannelChatHeaderComponent, ChannelChatWindowComponent]
})
export class ChannelChatCompleteComponent {

}
