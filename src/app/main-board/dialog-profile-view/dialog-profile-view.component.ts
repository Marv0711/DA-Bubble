import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-dialog-profile-view',
  standalone: true,
  imports: [],
  templateUrl: './dialog-profile-view.component.html',
  styleUrl: './dialog-profile-view.component.scss'
})
export class DialogProfileViewComponent {

  constructor(public dialogRef: MatDialogRef<DialogProfileViewComponent>, public firestoreService: FirestoreServiceService, public auth: AuthenticationService) {
    console.log(this.auth.auth.currentUser?.displayName);
    
  }

  closeProfilView() {
    this.dialogRef.close();
  }

}
