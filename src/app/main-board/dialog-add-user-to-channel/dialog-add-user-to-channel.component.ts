import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminserviceService } from '../../../services/adminservice.service';
import { DialogUserListComponent } from './dialog-user-list/dialog-user-list.component';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user-to-channel',
  standalone: true,
  imports: [FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,],
  templateUrl: './dialog-add-user-to-channel.component.html',
  styleUrl: './dialog-add-user-to-channel.component.scss'
})
export class DialogAddUserToChannelComponent {

  constructor(public dialogRef: MatDialogRef<DialogAddUserToChannelComponent>, public userDialogRef: MatDialog, admin: AdminserviceService) { }

  userToSearch!: string;
  rightUser!: string;
  first:boolean = true
  @ViewChild('inputField') inputField: any;

  closeAddUser() {
    this.dialogRef.close();
  }

  firstOpen(){
    if(this.first){
      this.openDialog();
    }
    this.first = false;
  }

  openDialog(): void {
    const dialogRef = this.userDialogRef.open(DialogUserListComponent, {
      disableClose: true,
      panelClass: 'custom-overlay-class',
      backdropClass: 'custom-overlay-class',
      data: { name: this.userToSearch },
      
    });
    this.inputField.nativeElement.focus();

    dialogRef.afterOpened().subscribe(() => {
      this.inputField.nativeElement.focus();
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.rightUser = result;
    });
  }

}
