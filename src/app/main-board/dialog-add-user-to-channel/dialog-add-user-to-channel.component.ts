import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChannelService } from '../../../services/channel.service';
import { CommonModule } from '@angular/common';

export interface User {
  profileImg: string;
  name: string;
}

@Component({
  selector: 'app-dialog-add-user-to-channel',
  standalone: true,
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    CommonModule],
  templateUrl: './dialog-add-user-to-channel.component.html',
  styleUrl: './dialog-add-user-to-channel.component.scss'
})
export class DialogAddUserToChannelComponent {

  constructor(public dialogRef: MatDialogRef<DialogAddUserToChannelComponent>,
    private firestore: FirestoreServiceService,
    private channelService: ChannelService) {
    this.filteredUsers = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filteredUsers(state) : this.allUser.slice())),
    );
  }

  userToSearch!: string;
  selectedUsers: any[] = []
  first: boolean = true


  @ViewChild('focus') focus: any;
  @ViewChild('userlist') userlist: any;
  @ViewChild('autocompleteTrigger') autocomplete!: MatAutocompleteTrigger;
  stateCtrl = new FormControl('');
  filteredUsers: Observable<User[]>;
  allUser: User[] = this.firestore.allUserList;



  /**
   * Filters the array of users based on the provided value.
   * @param {string} value - The value to filter users by.
   * @returns {User[]} An array of users whose names include the filtered value (case-insensitive).
   */
  private _filteredUsers(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.allUser.filter(user => user.name.toLowerCase().includes(filterValue));
  }


  closeAddUser() {
    this.dialogRef.close();
  }

  /**
 * Sets the user object as the  property.
 * 
 * @param {User} user - The user object to be set.
 */
  setUser(user: User) {

    if (this.selectedUsers.includes(user)) {
      // 
    } else {
      this.selectedUsers.push(user)
    }
    this.stateCtrl.reset();
  }

  reset() {
    this.selectedUsers = []
  }

  /**
   * Adds the currently selected user to the channel.
   * It updates the list of users in the channel by calling the `UpdateChannelUsers` method
   * from the `channelService`, using the email address of the currently selected user.
   */
  addUsertoChannel() {
    this.selectedUsers.forEach(user => {
      this.channelService.UpdateChannelUsers(user.mail)
    });
    this.closeAddUser();
  }

}
