import { Component, Input } from '@angular/core';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThreadMessageFieldComponent } from '../thread-message-field/thread-message-field.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../../services/authentication.service';
import { DialogProfileViewComponent } from '../dialog-profile-view/dialog-profile-view.component';



@Component({
  selector: 'app-thread-window',
  standalone: true,
  templateUrl: './thread-window.component.html',
  styleUrl: './thread-window.component.scss',
  imports: [CommonModule, ThreadMessageFieldComponent]
})
export class ThreadWindowComponent {

  constructor(private authService: AuthenticationService, public dialog: MatDialog, public chatService: FirestoreServiceService) {
  }


  showProfil(loginnames: string, usermail: string, userImg: string, chat:any) {
    console.log(chat)
    this.chatService.loginName = loginnames;
    this.chatService.userMail = usermail;
    this.chatService.userImage = userImg;
    const onlinestatus = this.authService.getUserOnlineStatus(usermail)
    this.chatService.userOnlineStatus = onlinestatus
    this.dialog.open(DialogProfileViewComponent);
  }


  closeThread() {
    document.getElementById('threat')?.classList.add('d-none');
  }


  dontclose(event: Event) {
    event.stopPropagation();
  }

}

