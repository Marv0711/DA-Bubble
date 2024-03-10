import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-dialog-profile-to-edit',
  standalone: true,
  imports: [],
  templateUrl: './dialog-profile-to-edit.component.html',
  styleUrl: './dialog-profile-to-edit.component.scss'
})
export class DialogProfileToEditComponent {

  constructor(public dialogRef: MatDialogRef<DialogProfileToEditComponent>, public firestoreService: FirestoreServiceService, public authentication: AuthenticationService) {}

  closeProfilView() {
    this.dialogRef.close();
  }

}
