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
import { FirestoreServiceService } from '../../../services/firestore-service.service';

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

  constructor(public dialogRef: MatDialogRef<DialogAddUserToChannelComponent>, public userDialogRef: MatDialog, private firestore: FirestoreServiceService) { }

  userToSearch!: string;
  rightUser!: string;
  first:boolean = true
  allUser!:any
  @ViewChild('inputField') inputField: any;
  @ViewChild('focus') focus: any;
  @ViewChild('userlist') userlist: any;

  closeAddUser() {
    this.dialogRef.close();
  }

  firstOpen(){
    if(this.first){
      this.openDiv();
    }
    //this.first = false;
  }

  //divOpen
  openDiv(){
    this.userlist.nativeElement.classList.add('d-unset');
    console.log(this.userToSearch);
    this.allUser = this.firestore.getUserRef();
    console.log(this.allUser);
    
  }





  //dialog Open
  openDialog(): void {
    const dialogRef = this.userDialogRef.open(DialogUserListComponent, {
      disableClose: true,
      panelClass: 'custom-overlay-class',
      backdropClass: 'custom-overlay-class',
      data: { name: this.userToSearch },
    });

    dialogRef.afterOpened().subscribe(() => {
      this.inputField.nativeElement.focus();
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.rightUser = result;
    });
  }

}
