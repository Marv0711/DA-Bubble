import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LogoComponent } from '../../logo/logo.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ThemePalette } from '@angular/material/core';
import { HeaderComponent } from '../header/header.component';
import { StorageService } from '../../../services/storage.service';
import { StorageReference, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { user } from '@angular/fire/auth';
import { UpdateUserService } from '../../../services/update-user.service';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { AuthenticationService } from '../../../services/authentication.service';
import { refEqual } from '@angular/fire/firestore';
import { FirestoreServiceService } from '../../../services/firestore-service.service';

@Component({
  selector: 'app-create-avatar',
  standalone: true,
  imports: [MatCardModule, LogoComponent, MatProgressBarModule, MatFormFieldModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatIconModule, FormsModule,
    ReactiveFormsModule, CommonModule, RouterLink, FooterComponent, MatCheckboxModule, HeaderComponent, CreateAccountComponent],
  templateUrl: './create-avatar.component.html',
  styleUrl: './create-avatar.component.scss',

})


export class CreateAvatarComponent implements OnInit {
  @ViewChild('profileImg') profileImg!: ElementRef;


  constructor(public updateUserService: UpdateUserService, public storageService: StorageService, private authService: AuthenticationService, public firestore: FirestoreServiceService) {
    this.inputPassword = this.updateUserService.inputPassword
    this.inputMail = this.updateUserService.inputMail
    this.username = this.updateUserService.username
    this.avatarUrl = ''
  }


  public avatarImages = [
    '../../../assets/img/avatars/male1.png',
    '../../../assets/img/avatars/male2.png',
    '../../../assets/img/avatars/female1.png',
    '../../../assets/img/avatars/male3.png',
    '../../../assets/img/avatars/male4.png',
    '../../../assets/img/avatars/female2.png',
  ]

  private avatarImagesUrls = [
    'gs://da-bubble-ba214.appspot.com/profileImages/avatars/male1.png',
    'gs://da-bubble-ba214.appspot.com/profileImages/avatars/male2.png',
    'gs://da-bubble-ba214.appspot.com/profileImages/avatars/female1.png',
    'gs://da-bubble-ba214.appspot.com/profileImages/avatars/male3.png',
    'gs://da-bubble-ba214.appspot.com/profileImages/avatars/male4.png',
    'gs://da-bubble-ba214.appspot.com/profileImages/avatars/female2.png',
  ]

  inputPassword: string;
  inputMail: string;
  username: string;
  isDisabled: boolean = false
  avatarUrl: string
  currentUserMail: string = "";

  ngOnInit(): void {
    this.setUsername()
  }


  /**
   *shows the right name
   */
  setUsername() {
    let username = document.getElementById('name');
    if (username) {
      username.innerHTML = this.username;
    }
  }


  /**
   * uploads the Image to the storage and caches the url in a variable
   */
  async uploadImage() {
    let path = await this.storageService.uploadFile('profileImages/')
    let url = await this.storageService.getStorageUrl(path)
    this.storageService.storageImgUrl = url!
  }


  /**
   * Displays the avatar you selected
   * @param url 
   */
  selectAvatar(url: string | null) {
    let img = this.profileImg.nativeElement
    img.src = url
    this.avatarUrl = url!
    console.log('avatarurl:', this.avatarUrl)
  }


  /**
   * resets all variables
   */
  resetData() {
    this.inputMail = ''
    this.username = ''
    this.inputPassword = ''
    this.storageService.resetData()
  }


  /**
   * creates the Account and uploads all needed Data
   */
  async createAccount() {
    if (this.avatarUrl.length > 0) {
      await this.createUserWithAvatar()
    }
    else if (this.avatarUrl.length === 0) {
      this.avatarUrl = '../../../assets/img/avatars/male1.png'
      await this.createUserWithAvatar()
    }
    else {
      await this.createUserWithImage()
    }
  }

  /**
 * creates a user with default avatar image
 */
  async createUserWithAvatar() {
    let index = this.getUrlIndex()
    let url = this.avatarImagesUrls[index!]
    let donwloadUrl = await this.storageService.getUrl(url)
    await this.createUser(donwloadUrl)
  }


  /**
   * create User with self uploaded image
   */
  async createUserWithImage() {
    await this.uploadImage()
    await this.createUser(this.storageService.storageImgUrl!)
  }


  /**
   * creates user with Email and password 
   * @param url url of the image
   */
  async createUser(url: any) {
    await this.updateUserService.createAccount(this.inputMail, this.username, this.inputPassword,)
    await this.updateUserService.updateUser(this.authService.auth.currentUser, this.username, this.storageService.storageImgUrl!)
    this.subscribeUserId(url) //<--
    console.log('create Account complete')
    this.resetData()
  }



  /**
   * Subscribes the userid of the currentUser
   * @param donwloadUrl url for the ProfileImage
   */
  subscribeUserId(donwloadUrl: string) {
    console.log("aktueller Account", this.authService.auth.currentUser?.email);
    this.firestore.subUserID(this.currentUserMail, donwloadUrl);
  }


  /**
   * Get the index number of the right url
   * @returns index number else 0 
   */

  getUrlIndex() {
    for (let i = 0; i < this.avatarImages.length; i++) {
      const url = this.avatarImages[i];
      if (url === this.avatarUrl) {
        return i;
      }
    }
    return 0;
  }









}



