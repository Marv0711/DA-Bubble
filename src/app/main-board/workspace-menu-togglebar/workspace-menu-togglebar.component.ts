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

  toggleWorkspaceMenu() {
    let workspaceText: any = document.getElementById('togglebar-text');
    let workspaceImg: any = document.getElementById('togglebar-img');
    if (this.workspaceOpen) {
      this.closeWorkspace(workspaceText, workspaceImg);
    } else {
      this.openWorkspace(workspaceImg, workspaceText);
    }
  }

  closeWorkspace(workspaceText: any, workspaceImg: any) {
    document.getElementById('app-workspace-menu')?.classList.add('d-none');
    workspaceText.innerHTML = 'Workspace-Menü öffnen'
    workspaceImg.src = 'assets/img/show_navigation.png'
    workspaceImg.classList.add('img-close');
    this.workspaceOpen = false;
  }

  openWorkspace(workspaceText: any, workspaceImg: any) {
    document.getElementById('app-workspace-menu')?.classList.remove('d-none');
    workspaceText.innerHTML = 'Workspace-Menü schließen'
    workspaceImg.src = 'assets/img/hide-navigation.png'
    workspaceImg.classList.remove('img-close');
    this.workspaceOpen = true;
  }
}
