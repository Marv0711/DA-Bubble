import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DialogEditProfileComponent } from '../dialog-edit-profile/dialog-edit-profile.component';

@Component({
  selector: 'app-dialog-profile-to-edit',
  standalone: true,
  imports: [MatIconModule, CommonModule, DialogEditProfileComponent],
  templateUrl: './dialog-profile-to-edit.component.html',
  styleUrl: './dialog-profile-to-edit.component.scss'
})
export class DialogProfileToEditComponent {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogProfileToEditComponent>, public firestoreService: FirestoreServiceService, public authentication: AuthenticationService) {}

  closeProfilView() {
    this.dialogRef.close();
  }
  
  openDialog() {
    this.dialog.open(DialogEditProfileComponent, {
        position: {
            top: '95px',
            right: '40px',
        },
        panelClass: 'dialog-edit-profile-responsive'

    });
}

}
