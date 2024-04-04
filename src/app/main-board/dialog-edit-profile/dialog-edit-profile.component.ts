import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Form, NgForm, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UpdateUserService } from '../../../services/update-user.service';
import { PopupMsgService } from '../../login/popup-msg/popup-msg.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { PopupMsgComponent } from '../../login/popup-msg/popup-msg.component';
import { StorageService } from '../../../services/storage.service';
import { ChannelService } from '../../../services/channel.service';
import { ChatService } from '../../../services/chat.service';
import { ThreadService } from '../../../services/thread.service';
@Component({
  selector: 'app-dialog-edit-profile',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatFormFieldModule, FormsModule, PopupMsgComponent],
  templateUrl: './dialog-edit-profile.component.html',
  styleUrl: './dialog-edit-profile.component.scss',
  // animations: [
  //   trigger('openClose', [
  //     // ...
  //     state('open', style({
  //       right: 250,
  //       opacity: 1,
  //     })),
  //     state('closed', style({
  //       right: 0,
  //       opacity: 0.0,
  //     })),
  //     transition('open => closed', [
  //       animate('0.1s')
  //     ]),
  //     transition('closed => open', [
  //       animate('0.3s')
  //     ]),
  //   ]),
  // ],
})
export class DialogEditProfileComponent implements OnInit {
  username: string = ''
  inputMail: string = ''
  userImage: string = ''
  oldUserImage: string = ''
  oldmail: string = ''
  public isOpen = false;

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogEditProfileComponent>,
    public firestoreService: FirestoreServiceService,
    public authentication: AuthenticationService,
    private userService: UpdateUserService,
    public msgService: PopupMsgService,
    public storageService: StorageService,
    private channelService: ChannelService,
    private chatService: ChatService,
    private threadService: ThreadService
  ) {


  }

  ngOnInit(): void {
    this.restetVaraibles()

  }

  /**
  * Closes the profile view dialog.
  */
  closeProfilView() {
    this.dialogRef.close();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.saveUser()
    }
  }

  async saveUser() {
    try {
      await this.updateCurrentUser()
      await this.updateFirestore()
      this.toggle('User erfolgreich bearbeitet')
      this.restetVaraibles()
      this.setNewImgOnPosts()
    } catch (error) {
      console.log(error)
      this.toggle('User bearbeiten FEHLGESCHLAGEN')
    }
  }

  async updateFirestore() {
    let docID = this.authentication.getUserId(this.oldmail)
    if (docID) {
      let user = this.firestoreService.getUser(docID)
      await this.firestoreService.updateUser(user, {
        mail: this.inputMail,
        name: this.username,
        profileImg: this.userImage
      })
    }
  }


  async updateCurrentUser() {
    if (this.username && this.username.length > 0) {
      await this.userService.updateUsername(this.authentication.currentUser, this.username);
    }
    if (this.inputMail && this.inputMail.length > 0) {
      console.log('email:', this.inputMail)
      await this.userService.updateEmailAdress(this.authentication.currentUser, this.inputMail);
    }
    if (this.userImage && this.userImage.length > 0) {
      await this.uploadImg()
      await this.userService.updatePhotoUrl(this.authentication.currentUser, this.userImage);
    }
  }

  async uploadImg() {
    try {
      const path = await this.storageService.uploadFile('profileImages/')
      const url = await this.storageService.getStorageUrl(path)
      this.userImage = url
    } catch (error) {
      alert('somthing went wrong with the File upload')
    }

  }


  restetVaraibles() {
    this.username = this.authentication.auth.currentUser?.displayName!
    this.inputMail = this.authentication.auth.currentUser?.email!
    this.userImage = this.authentication.auth.currentUser?.photoURL!
    this.oldmail = this.authentication.currentUser.email
    this.oldUserImage = this.authentication.currentUser.photoURL
    console.log(this.oldUserImage)
    this.isOpen = false
  }


  /**
   * toggle animation
   */
  toggle(message: string) {
    this.msgService.setPopupMsgText(message)
    this.isOpen = !this.isOpen;
    setTimeout(() => {
      this.isOpen = !this.isOpen;
      this.closeProfilView()
    }, 1000);
  }

/**
 * changes all profile images on every post for the user
 */
  async setNewImgOnPosts() {
    await this.userService.changeAllProfileImgs(this.chatService.chatList, 'chat')
    await this.userService.changeAllProfileImgs(this.threadService.ALLthreadList, 'thread')
    console.log('reload images')
    this.restetVaraibles()
  }
}
