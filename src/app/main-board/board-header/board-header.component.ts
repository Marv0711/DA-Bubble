import { Component, inject, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DialogBoarderHeaderComponent } from '../dialog-boarder-header/dialog-boarder-header.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { LogoComponent } from "../../logo/logo.component";
import { CommonModule } from '@angular/common';
import { OpenChatWindowResponsiveService } from '../../open-chat-window-responsive.service';

@Component({
    selector: 'app-board-header',
    standalone: true,
    templateUrl: './board-header.component.html',
    styleUrl: './board-header.component.scss',
    imports: [LogoComponent, MatIconModule, MatDialogModule, CommonModule]
})
export class BoardHeaderComponent {
    constructor(public dialog: MatDialog, public firestoreService: FirestoreServiceService) { }
    firestore: Firestore = inject(Firestore);
    ResponsiveService = inject(OpenChatWindowResponsiveService);

    ngOnInit() {
        this.checkRightUser('pw', 'mail');
    }

    openDialog() {
        this.dialog.open(DialogBoarderHeaderComponent, {
            position: {
                top: '150px',
                right: '20px',
            },
            panelClass: 'custom-container'
        });
    }

    async checkRightUser(pw: string, mail: string) {
        let querySnapshot = await getDocs(collection(this.firestore, 'users'));
        let documentIds;

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data && data['password'] === pw && data['email'] === mail) {
                let docRef = this.firestoreService.getUser(doc.id);
                this.firestoreService.getUserJSON(docRef);
            }
        });

        return documentIds;
    }

    closeChannel() {
        let workspaceMenu = document.getElementById('app-workspace-menu');
        let channelChatWindow = document.getElementById('app-channel-chat-window');
        if (workspaceMenu && channelChatWindow) {
            workspaceMenu.style.display = 'flex';
            channelChatWindow.style.display = 'none';
        }
        
    }

    @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth > 1200 && this.ResponsiveService.chatOpenAndWithUnder1200px) {
        this.ResponsiveService.chatOpenAndWithUnder1200px = false;
        }
        let workspaceMenu = document.getElementById('app-workspace-menu');
        let channelChatWindow = document.getElementById('app-channel-chat-window');
        if(workspaceMenu && channelChatWindow && window.innerWidth > 1200){
            workspaceMenu.style.display = 'flex';
            channelChatWindow.style.display = 'flex';
    }
    if (window.innerWidth < 1200 && !this.ResponsiveService.chatOpenAndWithUnder1200px) {
        let channelChatWindow = document.getElementById('app-channel-chat-window');
        let workspaceMenu = document.getElementById('app-workspace-menu');
        if(channelChatWindow && workspaceMenu){
            channelChatWindow.style.display = 'none';
            workspaceMenu.classList.remove('d-none')
        }
    }
  }
  
}
