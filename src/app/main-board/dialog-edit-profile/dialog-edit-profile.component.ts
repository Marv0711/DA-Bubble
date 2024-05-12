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
})


export class DialogEditProfileComponent implements OnInit {
  username: string = ''
  inputMail: string = ''
  userImage: string = ''
  oldUserImage: string = ''
  oldmail: string = ''
  public isOpen = false;
  submitting: boolean = false;


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
    this.storageService.currentFile = new File([], '');
  }

  /**
  * Closes the profile view dialog.
  */
  closeProfilView() {
    this.dialogRef.close();
  }

  /**
 * Handles form submission.
 * If the form is valid, it calls the 'saveUser' function to save the user's changes.
 * @param {NgForm} form - The NgForm object representing the form being submitted.
 */
  onSubmit(form: NgForm) {
    if (form.valid && !this.submitting) {
      this.submitting = true
      this.saveUser()
    }
  }

  /**
 * Saves the user's changes by updating user information in both authentication and Firestore,
 * then resets variables, displays a success message, and updates user images in posts.
 * If an error occurs during the process, it displays an error message.
 */
  async saveUser() {
    try {
      await this.updateCurrentUser()
      await this.updateFirestore()
      await this.setNewImgOnPosts()
      await this.setNewNamesOnPosts()
      await this.channelService.reloadImages()
      this.toggle('User erfolgreich bearbeitet')

      // this.restetVaraibles()
    } catch (error) {
      this.toggle('User bearbeiten FEHLGESCHLAGEN')
    }
    this.submitting = false
  }

  /**
 * Updates the user information in the Firestore database.
 * It retrieves the document ID of the user using the old email address,
 * retrieves the user document from Firestore based on the document ID,
 * and updates the user document with the new email address, username, and profile image URL.
 */
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

  /**
 * Updates the current user's profile information.
 * If a username is provided, it updates the username.
 * If an email address is provided, it updates the email address.
 * If a user image URL is provided, it updates the user's profile picture.
 */
  async updateCurrentUser() {
    if (this.username && this.username.length > 0) {
      await this.userService.updateUsername(this.authentication.currentUser, this.username);
    }
    if (this.inputMail && this.inputMail.length > 0) {
      await this.userService.updateEmailAdress(this.authentication.auth.currentUser, this.inputMail);
    }
    if (this.userImage && this.userImage.length > 0 && this.storageService.editProfileImgUrl.length > 0) {
      await this.uploadImg()
      await this.userService.updatePhotoUrl(this.authentication.currentUser, this.userImage);
    }
  }

  /**
 * Uploads a user image to the storage service and updates the userImage URL.
 * If successful, it updates the userImage URL with the uploaded image URL.
 * If an error occurs during the upload process, it displays an alert.
 */
  async uploadImg() {
    try {
      const path = await this.storageService.uploadFile('profileImages/')
      const url = await this.storageService.getStorageUrl(path)
      this.userImage = url
    } catch (error) {
      alert('somthing went wrong with the File upload')
    }
  }

  /**
 * Resets the variables related to user profile data.
 * It retrieves the current user's username, email address, and profile image URL,
 * assigns them to the corresponding variables, and sets other related variables.
 * Additionally, it sets the 'isOpen' variable to false.
 */
  restetVaraibles() {
    this.username = this.authentication.auth.currentUser?.displayName!
    this.inputMail = this.authentication.auth.currentUser?.email!
    this.userImage = this.authentication.auth.currentUser?.photoURL!
    this.oldmail = this.authentication.currentUser.email
    this.oldUserImage = this.authentication.currentUser.photoURL
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
    await this.chatService.getAllChats()
    await this.userService.changeAllProfileImgs(this.chatService.allChats, 'chat')
    await this.userService.changeAllProfileImgs(this.chatService.allChats, 'thread')
    await this.userService.changeAllProfileImgs(this.chatService.allChats, 'private')
  }


  async setNewNamesOnPosts() {
    await this.chatService.getAllChats()
    await this.userService.changeAllUserNames(this.chatService.allChats, 'chat')
    await this.userService.changeAllUserNames(this.chatService.allChats, 'thread')
    await this.userService.changeAllUserNames(this.chatService.allChats, 'private')
  }


}
