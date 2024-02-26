import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogAddUserToChannelComponent } from '../dialog-add-user-to-channel/dialog-add-user-to-channel.component';

@Component({
  selector: 'app-dialog-chat-userlist',
  standalone: true,
  imports: [],
  templateUrl: './dialog-chat-userlist.component.html',
  styleUrl: './dialog-chat-userlist.component.scss'
})
export class DialogChatUserlistComponent {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogChatUserlistComponent>) { }

  closeChatUserlist() {
    this.dialogRef.close();
  }

  openAddUserinTheUserlist() {
    this.closeChatUserlist();
    this.dialog.open(DialogAddUserToChannelComponent, {
      position: {
        top: '240px',
        right: '590px',
      },
      panelClass: 'custom-container'
    });
  }

}
