import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LogoComponent } from '../../logo/logo.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HeaderComponent } from '../header/header.component';
import { StorageService } from '../../../services/storage.service';
import { UpdateUserService } from '../../../services/update-user.service';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { AuthenticationService } from '../../../services/authentication.service';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { PopupMsgComponent } from '../popup-msg/popup-msg.component';
import { PopupMsgService } from '../popup-msg/popup-msg.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-create-avatar',
  standalone: true,
  imports: [MatCardModule, LogoComponent, MatProgressBarModule, MatFormFieldModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatIconModule, FormsModule,
    ReactiveFormsModule, CommonModule, RouterLink, FooterComponent, MatCheckboxModule, HeaderComponent, CreateAccountComponent, PopupMsgComponent],
  templateUrl: './create-avatar.component.html',
  styleUrl: './create-avatar.component.scss',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        right: 50,
        opacity: 1,
      })),
      state('closed', style({
        right: 0,
        opacity: 0.0,
      })),
      transition('open => closed', [
        animate('0.1s')
      ]),
      transition('closed => open', [
        animate('0.3s')
      ]),
    ]),
  ],
})


export class CreateAvatarComponent implements OnInit {
  @ViewChild('profileImg') profileImg!: ElementRef;


  constructor(public updateUserService: UpdateUserService,
    public storageService: StorageService,
    private authService: AuthenticationService,
    public firestore: FirestoreServiceService,
    public msgService: PopupMsgService) {
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
  public isOpen = false;

  ngOnInit(): void {
    this.setUsername()
  }


  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
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
    if (!this.username)
      this.authService.redirectTo('/create-account', 100)
  }


  /**
   * uploads the Image to the storage and caches the url in a variable
   */
  async uploadImage() {

    let path = await this.storageService.uploadFile('profileImages/')
    let url = await this.storageService.getStorageUrl(path)
    this.storageService.storageImgUrl = url
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
    if (this.storageService.imageUrl.length > 0) {
      await this.createUserWithImage();
    } else {
      if (this.avatarUrl.length > 0) {
        await this.createUserWithAvatar();
      } else {
        this.avatarUrl = '../../../assets/img/avatars/male1.png';
        await this.createUserWithAvatar();
      }
    }
    console.log(this.avatarUrl);
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
  async createUser(url: string) {
    try {
      await this.updateUserService.createAccount(this.inputMail, this.username, this.inputPassword,)
      await this.updateUserService.updateUser(this.authService.auth.currentUser, this.username, url)
      this.subscribeUserId(url) //<--
      this.toggle('Konto erfolgreich erstellt!')
      await this.authService.sendEmail(this.authService.auth.currentUser!)
      await this.firestore.addUser();
      this.resetData()
    } catch (error) {
      this.toggle('Etwas ist schief gelaufen!')
      this.authService.redirectTo('/create-account', 2100)
    }
  }


  /**
   * Subscribes the userid of the currentUser
   * @param donwloadUrl url for the ProfileImage
   */
  subscribeUserId(donwloadUrl: string) {
    console.log("aktueller Account", this.authService.auth.currentUser?.email);
    this.firestore.subUserID(this.inputMail, donwloadUrl);
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


  /**
   * toggle animation
   */
  toggle(message: string) {
    this.msgService.setPopupMsgText(message)
    this.isOpen = !this.isOpen;
    setTimeout(() => {
      this.isOpen = !this.isOpen;
    }, 2000);
  }





}



