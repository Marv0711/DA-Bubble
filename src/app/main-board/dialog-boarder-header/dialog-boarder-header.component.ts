import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dialog-boarder-header',
  standalone: true,
  imports: [],
  templateUrl: './dialog-boarder-header.component.html',
  styleUrl: './dialog-boarder-header.component.scss'
})
export class DialogBoarderHeaderComponent {
  constructor(private router: Router, private authService: AuthenticationService, public dialogRef: MatDialogRef<DialogBoarderHeaderComponent>) { }


  logout() {
    this.authService.signout()
    this.router.navigate(['/login'])

    //funktion zum schließen des dialogs einfügen
  }
}
