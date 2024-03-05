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

  constructor(public channelService: FirestoreServiceService, public dialog: MatDialog){
    
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

  showChannel(id:string) {
    this.channelService.subChatList(id)
    this.showChannels = true;
    
    setTimeout(() => {
      document.getElementById('chat-container')?.scrollIntoView({behavior: "smooth", block: "end"});
    }, 100);

    let workspaceMenu = document.getElementById('app-workspace-menu');
    let channelChatWindow = document.getElementById('app-channel-chat-window');
    if (channelChatWindow) {
      channelChatWindow.style.display = 'flex';
      if (window.innerWidth < 1300 && workspaceMenu) {
        workspaceMenu.style.display = 'none';
        this.ResponsiveService.chatOpenAndWithUnder1300px = true;
      }
    }
  }

  getChannels(){
    return this.channelService.channelList
  }

  
}
