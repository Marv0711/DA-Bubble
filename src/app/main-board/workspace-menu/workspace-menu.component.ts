import { ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { OpenChatWindowResponsiveService } from '../../open-chat-window-responsive.service';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workspace-menu',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './workspace-menu.component.html',
  styleUrl: './workspace-menu.component.scss'
})
export class WorkspaceMenuComponent {

  constructor(public channelService: FirestoreServiceService){
    
  }


  ResponsiveService = inject(OpenChatWindowResponsiveService);
  showChannels = true;
  showContacts = true;

  toggleChannels() {
    if (this.showChannels) {
      document.getElementById('content-channels')?.classList.add('d-none');
      document.getElementById('drop-down-channels')?.classList.add('rotate270');
      this.showChannels = false;
    } else {
      document.getElementById('content-channels')?.classList.remove('d-none');
      document.getElementById('drop-down-channels')?.classList.remove('rotate270');
      this.showChannels = true;
    }
  }

  toggleContacts() {
    if (this.showContacts) {
      document.getElementById('content-contacts')?.classList.add('d-none');
      document.getElementById('drop-down-contacts')?.classList.add('rotate270');
      this.showContacts = false;
    } else {
      document.getElementById('content-contacts')?.classList.remove('d-none');
      document.getElementById('drop-down-contacts')?.classList.remove('rotate270');
      this.showContacts = true;
    }
  }

  showChannel(id:string) {
    this.channelService.subChatList(id)

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
