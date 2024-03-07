import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { updateProfile, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FirestoreServiceService } from './firestore-service.service';
import { deleteUser } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {

  constructor(private authService: AuthenticationService, private router: Router, private fireService: FirestoreServiceService) { }


  inputPassword!: string;
  inputMail!: string;
  username!: string;

  /**
   * creats a account with email and password
   * @param email email of user as string
   * @param name  name of user as string
   * @param password  pw of user as string
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
  * @param user needs a userCredentail.currentUser /the user you want to change / the logged in user
  * @param username the new username
  * @param imgUrl the new image url
  */
  async updateUser(user: any, username: string, imgUrl: string,) {
    console.log('updating user')
    await this.updateUsername(user, username)
    await this.updatePhotoUrl(user, imgUrl)

  }


  /**
   * Changes the username
   * @param user needs a userCredentail.currentUser /the user you want to change / the logged in user
   * @param username the new username
   */
  async updateUsername(user: any, username: string) {
    await updateProfile(user, {
      displayName: username
    }).then(() => {
      console.log('Displayname set to:', user.displayName)
    })
  }


  /**
   * changs photoUrl
   * @param user needs a userCredentail.currentUser /the user you want to change / the logged in user
   * @param url the new image url
   */
  async updatePhotoUrl(user: any, url: string) {
    await updateProfile(user, {
      photoURL: url
    }).then(() => {
      console.log('photoURL set to:', user.photoURL)
    })
  }


  /**
   * 
   * @param user needs a userCredentail.currentUser /the user you want to change / the logged in user
   * @param email the new Email
   */
  async updateEmail(user: any, email: string) {
    await this.updateEmail(user, email).then(() => {
      console.log(console.log('New Email:', user.email))
    })
  }


  /**
 * delete user
 */
  deleteUser() {
    deleteUser(this.authService.auth.currentUser!).then(() => {
      // User deleted.
    }).catch((error) => {
      console.log('user deleted')
    });
  }




}




