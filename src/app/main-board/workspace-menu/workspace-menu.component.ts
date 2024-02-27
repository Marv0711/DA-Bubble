import { Component, Inject, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { OpenChatWindowResponsiveService } from '../../open-chat-window-responsive.service';

@Component({
  selector: 'app-workspace-menu',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './workspace-menu.component.html',
  styleUrl: './workspace-menu.component.scss'
})
export class WorkspaceMenuComponent {

  ResponsiveService = inject(OpenChatWindowResponsiveService);
  showChannels = true;
  showContacts = true;

  toggleChannels(){
    if(this.showChannels){
      document.getElementById('content-channels')?.classList.add('d-none');
      document.getElementById('drop-down-channels')?.classList.add('rotate270');
      this.showChannels = false;
    }else{
      document.getElementById('content-channels')?.classList.remove('d-none');
      document.getElementById('drop-down-channels')?.classList.remove('rotate270');
      this.showChannels = true;
    }
  }

  toggleContacts(){
    if(this.showContacts){
      document.getElementById('content-contacts')?.classList.add('d-none');
      document.getElementById('drop-down-contacts')?.classList.add('rotate270');
      this.showContacts = false;
    }else{
      document.getElementById('content-contacts')?.classList.remove('d-none');
      document.getElementById('drop-down-contacts')?.classList.remove('rotate270');
      this.showContacts = true;
    }
  }

  showChannel(){
   let workspaceMenu = document.getElementById('app-workspace-menu');
   let channelChatWindow = document.getElementById('app-channel-chat-window');
   if (workspaceMenu && channelChatWindow) {
    workspaceMenu.style.display = 'none';
    channelChatWindow.style.display = 'flex';
   }
  
   if(window.innerWidth < 1200){
    this.ResponsiveService.chatOpenAndWithUnder1200px = true;
   }
  }

}
