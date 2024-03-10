import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


export interface User {
  profileImg: string;
  name: string;
}

@Component({
  selector: 'app-dialog-add-user-to-channel',
  standalone: true,
  imports: [ FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,],
  templateUrl: './dialog-add-user-to-channel.component.html',
  styleUrl: './dialog-add-user-to-channel.component.scss'
})
export class DialogAddUserToChannelComponent {

  constructor(public dialogRef: MatDialogRef<DialogAddUserToChannelComponent>, private firestore: FirestoreServiceService) {
    this.filteredUsers = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filteredUsers(state) : this.allUser.slice())),
    );
   }

  userToSearch!: string;
  rightUser!: any;
  first:boolean = true
  @ViewChild('inputField') inputField: any;
  @ViewChild('focus') focus: any;
  @ViewChild('userlist') userlist: any;

  stateCtrl = new FormControl('');
  filteredUsers: Observable<User[]>;
  allUser: User[] = this.firestore.allUserList;

  private _filteredUsers(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.allUser.filter(user => user.name.toLowerCase().includes(filterValue));
  }


  closeAddUser() {
    this.dialogRef.close();
  }

  setUser(user:User){
    this.rightUser = user;
  }

  addUsertoChannel(){
    console.log(this.firestore.channelID);
  }

}
