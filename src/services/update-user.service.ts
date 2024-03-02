import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {

  constructor(private authService: AuthenticationService, private router: Router) { }


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
      await this.authService.updateUser(userCredentail.user, loginUsername, 'url')
      console.log('Account erstellt', userCredentail.user);
      await this.authService.signout()
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential')
        console.log('create account failed')
    }
  }













}
