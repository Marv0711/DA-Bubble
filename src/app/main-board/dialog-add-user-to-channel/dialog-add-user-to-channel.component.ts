import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminserviceService } from '../../../services/adminservice.service';

@Component({
  selector: 'app-dialog-add-user-to-channel',
  standalone: true,
  imports: [],
  templateUrl: './dialog-add-user-to-channel.component.html',
  styleUrl: './dialog-add-user-to-channel.component.scss'
})
export class DialogAddUserToChannelComponent {

  constructor(public dialogRef: MatDialogRef<DialogAddUserToChannelComponent>, admin: AdminserviceService) {
    admin.test()
  }

  closeAddUser() {
    this.dialogRef.close();
  }

}
