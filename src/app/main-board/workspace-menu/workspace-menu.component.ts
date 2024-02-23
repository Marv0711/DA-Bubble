import { Component } from '@angular/core';

@Component({
  selector: 'app-workspace-menu',
  standalone: true,
  imports: [],
  templateUrl: './workspace-menu.component.html',
  styleUrl: './workspace-menu.component.scss'
})
export class WorkspaceMenuComponent {

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
}
