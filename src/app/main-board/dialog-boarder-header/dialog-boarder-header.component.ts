import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-boarder-header',
  standalone: true,
  imports: [],
  templateUrl: './dialog-boarder-header.component.html',
  styleUrl: './dialog-boarder-header.component.scss'
})
export class DialogBoarderHeaderComponent {
  constructor(public dialogRef: MatDialogRef<DialogBoarderHeaderComponent>) {}
}
