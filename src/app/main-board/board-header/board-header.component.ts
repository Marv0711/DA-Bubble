import { Component, inject, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DialogBoarderHeaderComponent } from '../dialog-boarder-header/dialog-boarder-header.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { LogoComponent } from "../../logo/logo.component";
import { CommonModule } from '@angular/common';
import { OpenChatWindowResponsiveService } from '../../open-chat-window-responsive.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
    selector: 'app-board-header',
    standalone: true,
    templateUrl: './board-header.component.html',
    styleUrl: './board-header.component.scss',
    imports: [LogoComponent, MatIconModule, MatDialogModule, CommonModule]
})
export class BoardHeaderComponent {
    constructor(public dialog: MatDialog, public authentication: AuthenticationService) { }
    firestore: Firestore = inject(Firestore);
    ResponsiveService = inject(OpenChatWindowResponsiveService);

    chatOpenAndWithUnder1200px: boolean = false;

    openDialog() {
        this.dialog.open(DialogBoarderHeaderComponent, {
            position: {
                top: '150px',
                right: '20px',
            },
            panelClass: 'custom-container'
        });
    }

    closeChannel() {
        let workspaceMenu = document.getElementById('app-workspace-menu');
        let channelChatWindow = document.getElementById('app-channel-chat-window');
        this.ResponsiveService.chatOpenAndWithUnder1300px = false;
        if (workspaceMenu && channelChatWindow) {
            workspaceMenu.style.display = 'flex';
            channelChatWindow.style.display = 'none';
        }
        
    }

    @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth > 1300 && this.ResponsiveService.chatOpenAndWithUnder1300px) {
        this.ResponsiveService.chatOpenAndWithUnder1300px = false;
        }
        let workspaceMenu = document.getElementById('app-workspace-menu');
        let channelChatWindow = document.getElementById('app-channel-chat-window');
        if(workspaceMenu && channelChatWindow && window.innerWidth > 1300){
            workspaceMenu.style.display = 'flex';
            channelChatWindow.style.display = 'flex';
    }
    if (window.innerWidth < 1300 && !this.ResponsiveService.chatOpenAndWithUnder1300px) {
        let channelChatWindow = document.getElementById('app-channel-chat-window');
        let workspaceMenu = document.getElementById('app-workspace-menu');
        if(channelChatWindow && workspaceMenu){
            channelChatWindow.style.display = 'none';
            workspaceMenu.classList.remove('d-none')
        }
    }
  }
  
}
