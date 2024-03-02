import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { UserCredential, updateProfile, updateEmail, UserInfo, UserProfile, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { User } from '../models/user.class';
import { FirestoreServiceService } from './firestore-service.service';


@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {

  constructor(private authService: AuthenticationService, private router: Router, private fireService: FirestoreServiceService) { }


  inputPassword!: string;
  inputMail!: string;
  username!: string;

  /**
   * creates an account with email and password and displayName
   */
  async createAccount(email: string, name: string, password: string) {
    const loginEmail = email
    const loginPassword = password
    const loginUsername = name

    try {
      const userCredentail = await createUserWithEmailAndPassword(this.authService.auth, loginEmail, loginPassword)
      console.log('Account erstellt', userCredentail.user);
    } catch (err: any) {
      if (err.code)
        console.error('create account failed', err)
    }
  }


  /**
  * 
  * @param user needs a userCredentail.user /the user you want to change
  * @param username the new username
  * @param imgUrl the new profilepicture path
  */
  async updateUser(user: any, username: string, imgUrl: string ,) {
    console.log('updating user')
    await this.updateUsername(user, username)
    await this.updatePhotoUrl(user, imgUrl)

  }



  async updateUsername(user: any, username: string) {
    await updateProfile(user, {
      displayName: username
    }).then(() => {
      console.log('Displayname set to:', user.displayName)
    })
  }


  async updatePhotoUrl(user: any, url: string) {
    await updateProfile(user, {
      photoURL: url
    }).then(() => {
      console.log('photoURL set to:', user.photoURL)
    })
  }


  async updateEmail(user: any, email: string) {
    await this.updateEmail(user, email).then(() => {
      console.log(console.log('New Email:', user.email))
    })
  }






}




