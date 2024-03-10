import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-profile-to-edit',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './dialog-profile-to-edit.component.html',
  styleUrl: './dialog-profile-to-edit.component.scss'
})
export class DialogProfileToEditComponent {

  constructor(public dialogRef: MatDialogRef<DialogProfileToEditComponent>, public firestoreService: FirestoreServiceService, public authentication: AuthenticationService) {}

  closeProfilView() {
    this.dialogRef.close();
  }

}
