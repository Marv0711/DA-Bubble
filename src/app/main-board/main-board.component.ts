import { Component } from '@angular/core';
import { BoardHeaderComponent } from "./board-header/board-header.component";
import { WorkspaceMenuComponent } from './workspace-menu/workspace-menu.component';

@Component({
    selector: 'app-main-board',
    standalone: true,
    templateUrl: './main-board.component.html',
    styleUrl: './main-board.component.scss',
    imports: [BoardHeaderComponent, WorkspaceMenuComponent]
})
export class MainBoardComponent {

}
