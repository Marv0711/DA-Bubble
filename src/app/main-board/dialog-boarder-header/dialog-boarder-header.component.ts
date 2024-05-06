import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { DialogProfileToEditComponent } from '../dialog-profile-to-edit/dialog-profile-to-edit.component';
import { set } from '@angular/fire/database';
@Component({
  selector: 'app-dialog-boarder-header',
  standalone: true,
  imports: [DialogProfileToEditComponent],
  templateUrl: './dialog-boarder-header.component.html',
  styleUrl: './dialog-boarder-header.component.scss'
})
export class DialogBoarderHeaderComponent {
  constructor(public dialog: MatDialog, private router: Router, private authService: AuthenticationService, public dialogRef: MatDialogRef<DialogBoarderHeaderComponent>) { }


<<<<<<< Updated upstream
  logout() {
    this.authService.signout()
    this.router.navigate(['/login'])
=======
  async logout() {
    await this.authService.signout()
    
    this.router.navigate(['/singup'])
>>>>>>> Stashed changes

    this.dialog.closeAll()
  }

  openDialog() {
    this.dialog.open(DialogProfileToEditComponent, {
        position: {
            top: '95px',
            right: '40px',
        },
        panelClass: ['custom-container', 'profile-dialog-to-edit-responsive']

    });
}
}
