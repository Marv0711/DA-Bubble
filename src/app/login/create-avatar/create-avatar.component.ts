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


  constructor(public updateUserService: UpdateUserService, public storageService: StorageService, private authService: AuthenticationService) {
    this.inputPassword = this.updateUserService.inputPassword
    this.inputMail = this.updateUserService.inputMail
    this.username = this.updateUserService.username

  }


  public avatarImages = [
    '../../../assets/img/avatars/male1.png',
    '../../../assets/img/avatars/male2.png',
    '../../../assets/img/avatars/female1.png',
    '../../../assets/img/avatars/male3.png',
    '../../../assets/img/avatars/male4.png',
    '../../../assets/img/avatars/female2.png',
  ]


  inputPassword: string;
  inputMail: string;
  username: string;
  isDisabled: boolean = false


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
    await this.uploadImage()
    await this.updateUserService.createAccount(this.inputMail, this.username, this.inputPassword,)
    await this.updateUserService.updateUser(this.authService.auth.currentUser, this.username, this.storageService.storageImgUrl!)
    console.log('create Account complete')
    this.resetData()
  }

}





