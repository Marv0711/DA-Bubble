import { ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { OpenChatWindowResponsiveService } from '../../open-chat-window-responsive.service';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { CommonModule } from '@angular/common';
import { DialogCreateChannelComponent } from '../dialog-create-channel/dialog-create-channel.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-workspace-menu',
  standalone: true,
  imports: [MatIconModule, CommonModule, DialogCreateChannelComponent],
  templateUrl: './workspace-menu.component.html',
  styleUrl: './workspace-menu.component.scss'
})
export class WorkspaceMenuComponent {

  constructor(public channelService: FirestoreServiceService, public dialog: MatDialog) {

  }


  ResponsiveService = inject(OpenChatWindowResponsiveService);
  showChannels = true;
  showContacts = true;

  openCreateChannel() {
    this.dialog.open(DialogCreateChannelComponent, {
      panelClass: 'create-channel-responsive'
    })
  }

  toggleChannels() {
    if (this.showChannels) {
      this.hideChannelArea();
    } else {
      this.showChannelArea();
    }
  }

  hideChannelArea() {
    document.getElementById('content-channels')?.classList.add('d-none');
    document.getElementById('drop-down-channels')?.classList.add('rotate270');
    this.showChannels = false;
  }

  showChannelArea() {
    document.getElementById('content-channels')?.classList.remove('d-none');
    document.getElementById('drop-down-channels')?.classList.remove('rotate270');
  }

  toggleContacts() {
    if (this.showContacts) {
      this.hideContactArea()
    } else {
      this.showContactArea()
    }
  }

  hideContactArea() {
    document.getElementById('content-contacts')?.classList.add('d-none');
    document.getElementById('drop-down-contacts')?.classList.add('rotate270');
    this.showContacts = false;
  }

  showContactArea() {
    document.getElementById('content-contacts')?.classList.remove('d-none');
    document.getElementById('drop-down-contacts')?.classList.remove('rotate270');
    this.showContacts = true;
  }

  showChannel(id: string) {
    let workspaceMenu = document.getElementById('app-workspace-menu');
    let channelChatWindow = document.getElementById('app-channel-chat-window');
    let messageChatWindow = document.getElementById('app-message-chat-window');
    this.channelService.subChatList(id)
    this.showChannels = true;
    this.scrollToBottomofChat();
    if (channelChatWindow && messageChatWindow) {
      channelChatWindow.style.display = 'flex';
      messageChatWindow.style.display = 'none';
      this.ResponsiveService.directMessagesOpen = false;
      this.showMobileChannelChat(workspaceMenu);
    }
  }

  showMobileChannelChat(workspaceMenu: any) {
    if (window.innerWidth < 1300 && workspaceMenu) {
      workspaceMenu.style.display = 'none';
      this.ResponsiveService.chatOpenAndWithUnder1300px = true;
    }
  }

  scrollToBottomofChat() {
    setTimeout(() => {
      document.getElementById('chat-container')?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
  }

  getChannels() {
    return this.channelService.channelList
  }

  showChat() {
    let workspaceMenu = document.getElementById('app-workspace-menu');
    let channelChatWindow = document.getElementById('app-channel-chat-window');
    let messageChatWindow = document.getElementById('app-message-chat-window');
    debugger
    if (channelChatWindow && messageChatWindow) {
      this.ResponsiveService.directMessagesOpen = true;
      channelChatWindow.style.display = 'none';
      messageChatWindow.style.display = 'flex';
      this.showMobileMessageChat(workspaceMenu);
    }
  }

  showMobileMessageChat(workspaceMenu: any) {
    if (window.innerWidth < 1300 && workspaceMenu) {
      workspaceMenu.style.display = 'none';
      this.ResponsiveService.directMessageOpenAndWithUnder1300px = true;
    }
  }


}
