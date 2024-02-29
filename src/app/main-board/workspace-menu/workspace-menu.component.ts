import { Component, Inject, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { OpenChatWindowResponsiveService } from '../../open-chat-window-responsive.service';
import { DialogCreateChannelComponent } from '../dialog-create-channel/dialog-create-channel.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-workspace-menu',
  standalone: true,
  imports: [MatIconModule, DialogCreateChannelComponent, ],
  templateUrl: './workspace-menu.component.html',
  styleUrl: './workspace-menu.component.scss'
})
export class WorkspaceMenuComponent {

  ResponsiveService = inject(OpenChatWindowResponsiveService);
  showChannels = true;
  showContacts = true;

  constructor(public dialog: MatDialog){

  }

  openCreateChannel() {
    if(window.innerWidth < 550){
      this.dialog.open(DialogCreateChannelComponent, {
        height: '100%',
        width: '100%',
        maxWidth: '100%'
      });
    }else{
      this.dialog.open(DialogCreateChannelComponent)
    }
   

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
    this.showChannels = true;
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

  showChannel() {

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

  
}
