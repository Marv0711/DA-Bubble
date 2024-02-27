import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DialogBoarderHeaderComponent } from '../dialog-boarder-header/dialog-boarder-header.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { LogoComponent } from "../../logo/logo.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-board-header',
    standalone: true,
    templateUrl: './board-header.component.html',
    styleUrl: './board-header.component.scss',
    imports: [LogoComponent, MatIconModule, MatDialogModule, CommonModule]
})
export class BoardHeaderComponent {
    constructor(public dialog: MatDialog, public firestoreService: FirestoreServiceService) { }

    chatOpenAndWithUnder1200px: boolean = false;

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
