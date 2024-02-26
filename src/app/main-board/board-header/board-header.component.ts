import { Component } from '@angular/core';
import { LogoComponent } from "../../logo/logo.component";
import { MatIconModule } from '@angular/material/icon';
import { DialogBoarderHeaderComponent } from '../dialog-boarder-header/dialog-boarder-header.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-board-header',
    standalone: true,
    templateUrl: './board-header.component.html',
    styleUrl: './board-header.component.scss',
    imports: [LogoComponent, MatIconModule, MatDialogModule, CommonModule]
})
export class BoardHeaderComponent {

    chatOpenAndWithUnder1200px: boolean = false;

    constructor(public dialog: MatDialog) { }

    openDialog() {
        this.dialog.open(DialogBoarderHeaderComponent,{
            position: {
                top: '150px',
                right: '20px',
            },
            panelClass: 'custom-container' 
        });
    }
}
