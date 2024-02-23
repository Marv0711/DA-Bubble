import { Component } from '@angular/core';

@Component({
  selector: 'app-workspace-menu-togglebar',
  standalone: true,
  imports: [],
  templateUrl: './workspace-menu-togglebar.component.html',
  styleUrl: './workspace-menu-togglebar.component.scss'
})
export class WorkspaceMenuTogglebarComponent {

  workspaceOpen = true;

  toggleWorkspaceMenu(){
    let workspaceText: any = document.getElementById('togglebar-text');
    if (this.workspaceOpen) {
      document.getElementById('app-workspace-menu')?.classList.add('d-none');
      workspaceText.innerHTML = 'Workspace-Menü öffnen'
      this.workspaceOpen = false;
    }else{
      document.getElementById('app-workspace-menu')?.classList.remove('d-none');
      workspaceText.innerHTML = 'Workspace-Menü schließen'
      this.workspaceOpen = true;
    }
  }
}
