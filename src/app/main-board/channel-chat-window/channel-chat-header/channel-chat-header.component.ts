import { Component } from '@angular/core';
import { FirestoreServiceService } from '../../../../services/firestore-service.service';
import { DialogEditChannelComponent } from '../../dialog-edit-channel/dialog-edit-channel.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DialogChatUserlistComponent } from '../../dialog-chat-userlist/dialog-chat-userlist.component';
import { DialogAddUserToChannelComponent } from '../../dialog-add-user-to-channel/dialog-add-user-to-channel.component';

@Component({
  selector: 'app-channel-chat-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './channel-chat-header.component.html',
  styleUrl: './channel-chat-header.component.scss'
})
export class ChannelChatHeaderComponent {

  constructor(public chatService: FirestoreServiceService, public dialog: MatDialog) { }

  openEditChannel() {
    this.dialog.open(DialogEditChannelComponent, {
      panelClass: ['edit-channel-dialog-responsive'],
    });

  }

  openAddUserdialog() {
    if (window.innerWidth < 550) {
      this.openUserList();
    } else {
      this.dialog.open(DialogAddUserToChannelComponent, {
        position: {
          top: '190px',
          right: '590px',
        },
        panelClass: ['custom-container', 'add-user-dialog-responsive'],
        backdropClass: 'backdrop-add-user-dialog'
      });
    }
  }

  openUserList() {
    this.dialog.open(DialogChatUserlistComponent, {
      position: {
        top: '190px',
        right: '690px',
      },
      panelClass: ['custom-container', 'open-user-dialog-responsive'],
    });
  }

  getUserImages() {
    return this.chatService.channelProfileImagesList;
    
  }

}
