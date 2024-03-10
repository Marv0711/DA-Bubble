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
    constructor(public dialog: MatDialog, public authentication: AuthenticationService, public firestore: FirestoreServiceService) {
        this.firestore.currentUser = this.authentication.currentUser
        
    }
    ResponsiveService = inject(OpenChatWindowResponsiveService);
    chatOpenAndWithUnder1200px: boolean = false;



    openDialog() {
        this.dialog.open(DialogBoarderHeaderComponent, {
            position: {
                top: '95px',
                right: '40px',
            },
            panelClass: ['custom-container', 'profile-dialog-responsive']

        });
    }

    closeChannel() {
        let workspaceMenu = document.getElementById('app-workspace-menu');
        let channelChatWindow = document.getElementById('app-channel-chat-window');
        let messageChatWindow = document.getElementById('app-message-chat-window');
        this.ResponsiveService.chatOpenAndWithUnder1300px = false;
        this.ResponsiveService.directMessageOpenAndWithUnder1300px = false;

        if (workspaceMenu && channelChatWindow && messageChatWindow) {
            workspaceMenu.style.display = 'flex';
            channelChatWindow.style.display = 'none';
            messageChatWindow.style.display = 'none';
        }

    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        let workspaceMenu = document.getElementById('app-workspace-menu');
        let channelChatWindow = document.getElementById('app-channel-chat-window');
        let messageChatWindow = document.getElementById('app-message-chat-window');
        this.channelChatWindowIsOpenandWindowIsChangeToBrowserView();
        this.messageChatWindowIsOpenandWindowIsChangeToBrowserView();
        this.showChannelChatInDesktopView(workspaceMenu, channelChatWindow, messageChatWindow);
        this.showMessageChatInDesktopView(workspaceMenu, channelChatWindow, messageChatWindow);
        this.channelChatWindowIsOpenandWindowIsChangeToMobileView(workspaceMenu, channelChatWindow);
        this.messageChatWindowIsOpenandWindowIsChangeToMobileView(workspaceMenu, messageChatWindow);
    }

    channelChatWindowIsOpenandWindowIsChangeToBrowserView() {
        if (window.innerWidth > 1300 && this.ResponsiveService.chatOpenAndWithUnder1300px) {
            this.ResponsiveService.chatOpenAndWithUnder1300px = false;
        }
    }

    messageChatWindowIsOpenandWindowIsChangeToBrowserView() {
        if (window.innerWidth > 1300 && this.ResponsiveService.directMessageOpenAndWithUnder1300px) {
            this.ResponsiveService.directMessageOpenAndWithUnder1300px = false;
        }
    }

    showChannelChatInDesktopView(workspaceMenu: any, channelChatWindow: any, messageChatWindow: any) {
        if (workspaceMenu && channelChatWindow && window.innerWidth > 1300 && !this.ResponsiveService.directMessagesOpen && messageChatWindow) {
            workspaceMenu.style.display = 'flex';
            channelChatWindow.style.display = 'flex';
            messageChatWindow.style.display = 'none';
        }
    }

    showMessageChatInDesktopView(workspaceMenu: any, channelChatWindow: any, messageChatWindow: any) {
        if (workspaceMenu && channelChatWindow && window.innerWidth > 1300 && this.ResponsiveService.directMessagesOpen && messageChatWindow) {
            workspaceMenu.style.display = 'flex';
            channelChatWindow.style.display = 'none';
            messageChatWindow.style.display = 'flex';
        }
    }

    channelChatWindowIsOpenandWindowIsChangeToMobileView(workspaceMenu: any, channelChatWindow: any,) {
        if (window.innerWidth < 1300 && !this.ResponsiveService.chatOpenAndWithUnder1300px) {
            if (channelChatWindow && workspaceMenu) {
                channelChatWindow.style.display = 'none';
                workspaceMenu.classList.remove('d-none')
            }
        }
    }

    messageChatWindowIsOpenandWindowIsChangeToMobileView(workspaceMenu: any, messageChatWindow: any) {
        if (window.innerWidth < 1300 && !this.ResponsiveService.directMessageOpenAndWithUnder1300px) {
            if (messageChatWindow && workspaceMenu) {
                messageChatWindow.style.display = 'none';
                workspaceMenu.classList.remove('d-none')
            }
        }
    }
}
