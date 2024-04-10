import { Component, OnInit } from '@angular/core';
import { BoardHeaderComponent } from "./board-header/board-header.component";
import { WorkspaceMenuComponent } from './workspace-menu/workspace-menu.component';
import { ChannelChatWindowComponent } from './channel-chat-window/channel-chat-window.component';
import { ThreadWindowComponent } from './thread-window/thread-window.component';
import { WorkspaceMenuTogglebarComponent } from './workspace-menu-togglebar/workspace-menu-togglebar.component';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { MessageChatWindowComponent } from './message-chat-window/message-chat-window.component';
import { NewMessageComponent } from './new-message/new-message.component';
import { EmojiService } from '../../services/emoji.service';
import { ChatService } from '../../services/chat.service';
import { ChannelService } from '../../services/channel.service';
@Component({
    selector: 'app-main-board',
    standalone: true,
    templateUrl: './main-board.component.html',
    styleUrl: './main-board.component.scss',
    imports: [BoardHeaderComponent, WorkspaceMenuComponent,
        ChannelChatWindowComponent, ThreadWindowComponent,
        WorkspaceMenuTogglebarComponent, RouterLink, CommonModule, MessageChatWindowComponent, NewMessageComponent]
})
export class MainBoardComponent implements OnInit {
    constructor(
        public emojiService: EmojiService,
        public authService: AuthenticationService,
        public chatService: ChatService,
        private channelService: ChannelService
    ) { }
    ngOnInit(): void {
        this.chatService.getAllChats()
    }

    /**
   * Closes the emoji field by invoking a method from the emoji service.
    */
    closeEmojiField() {
        this.emojiService.closeEmojiField();
    }


}


