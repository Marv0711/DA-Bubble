import { Component } from '@angular/core';
import { BoardHeaderComponent } from "./board-header/board-header.component";
import { WorkspaceMenuComponent } from './workspace-menu/workspace-menu.component';
import { ChannelChatWindowComponent } from './channel-chat-window/channel-chat-window.component';
import { ThreadWindowComponent } from './thread-window/thread-window.component';
import { WorkspaceMenuTogglebarComponent } from './workspace-menu-togglebar/workspace-menu-togglebar.component';
import { RouterLink } from '@angular/router';
import { CloseEmojiService } from '../../services/close-emoji.service';

@Component({
    selector: 'app-main-board',
    standalone: true,
    templateUrl: './main-board.component.html',
    styleUrl: './main-board.component.scss',
    imports: [BoardHeaderComponent, WorkspaceMenuComponent, 
        ChannelChatWindowComponent, ThreadWindowComponent, 
        WorkspaceMenuTogglebarComponent, RouterLink,]
})
export class MainBoardComponent {
    constructor(public CloseEmojiService: CloseEmojiService){}

    closeEmojiField(){
        this.CloseEmojiService.closeEmojiField();
    }
}
