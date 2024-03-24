import { Component, Input } from '@angular/core';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThreadMessageFieldComponent } from '../thread-message-field/thread-message-field.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../../services/authentication.service';
import { DialogProfileViewComponent } from '../dialog-profile-view/dialog-profile-view.component';
import { ThreadService } from '../../../services/thread.service';
import { ChannelService } from '../../../services/channel.service';



@Component({
  selector: 'app-thread-window',
  standalone: true,
  templateUrl: './thread-window.component.html',
  styleUrl: './thread-window.component.scss',
  imports: [CommonModule, ThreadMessageFieldComponent]
})
export class ThreadWindowComponent {

  constructor(public threadService: ThreadService, 
    private authService: AuthenticationService, 
    public dialog: MatDialog, 
    public chatService: FirestoreServiceService,
    public channelService: ChannelService) {
  }

 /**
 * Displays the profile of a user.
 * @param loginnames The login name of the user whose profile is being displayed.
 * @param usermail The email address of the user whose profile is being displayed.
 * @param userImg The URL of the profile image of the user.
 * @param chat An object containing chat information.
 */
  showProfil(loginnames: string, usermail: string, userImg: string, chat:any) {
    this.chatService.loginName = loginnames;
    this.chatService.userMail = usermail;
    this.chatService.userImage = userImg;
    // Get the online status of the user
    const onlinestatus = this.authService.getUserOnlineStatus(usermail)
    // Set the online status in the chat service
    this.chatService.userOnlineStatus = onlinestatus
     // Open the profile view dialog
    this.dialog.open(DialogProfileViewComponent);
  }

 /**
 * Closes the thread by hiding its corresponding element in the DOM.
 */
  closeThread() {
    document.getElementById('threat')?.classList.add('d-none');
  }

 /**
 * Prevents the propagation of the event.
 * @param event The event object.
 */
  dontclose(event: Event) {
    event.stopPropagation();
  }

}

