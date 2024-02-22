import { Component } from '@angular/core';
import { BoardHeaderComponent } from "./board-header/board-header.component";
import { WorkspaceMenuComponent } from './workspace-menu/workspace-menu.component';
import { ChannelChatWindowComponent } from './channel-chat-window/channel-chat-window.component';
import { ThreadWindowComponent } from './thread-window/thread-window.component';

@Component({
    selector: 'app-main-board',
    standalone: true,
    templateUrl: './main-board.component.html',
    styleUrl: './main-board.component.scss',
    imports: [BoardHeaderComponent, WorkspaceMenuComponent, ChannelChatWindowComponent, ThreadWindowComponent]
})
export class MainBoardComponent {

}
