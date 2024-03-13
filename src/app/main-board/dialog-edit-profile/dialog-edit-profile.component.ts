import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-edit-profile',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './dialog-edit-profile.component.html',
  styleUrl: './dialog-edit-profile.component.scss'
})
export class DialogEditProfileComponent {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogEditProfileComponent>, public firestoreService: FirestoreServiceService, public authentication: AuthenticationService) {}


  closeProfilView() {
    this.dialogRef.close();
  }
}
