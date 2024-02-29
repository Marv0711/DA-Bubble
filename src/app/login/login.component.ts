import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LogoComponent } from '../logo/logo.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FirestoreServiceService, } from '../../services/firestore-service.service';
import { AuthenticationService } from '../../services/authentication.service';
import { signInWithEmailAndPassword } from '@angular/fire/auth';
import { StorageService } from '../../services/storage.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, LogoComponent, MatProgressBarModule, MatFormFieldModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatIconModule, FormsModule,
    ReactiveFormsModule, CommonModule, RouterLink, FooterComponent,
    HeaderComponent,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',

})


export class LoginComponent implements OnInit {

  inputPassword!: string;
  inputMail!: string;

  constructor(public storageService: StorageService, public firestoreService: FirestoreServiceService, public authService: AuthenticationService, private router: Router) {
  }

  async ngOnInit(): Promise<any> {
   await this.logutIfUserIsLoggedIn()
  }


  // if you logged in and you return back somehow to the login window. You will be logged out automaticly
  async logutIfUserIsLoggedIn() {
    if (this.authService.auth.currentUser !== null) {
      await this.authService.signout()
      this.authService.currentUser = this.authService.auth.currentUser
      console.error('user automatisch ausgeloggt', this.authService.currentUser)
    }
  }

  
/**
 * Loginlogic
 * @param form the form from the inputcontainer in the HTML doc
 */
  async onSubmit(form: NgForm) {
    if (form.valid) {

      await this.loginEmailPassword()

    } else {
      console.error('Formular ist ungültig!');
    }
  }

 
/**
 *Log the user into the Firebase with email and passwort 
 */
  async loginEmailPassword() {
    const loginEmail = this.inputMail
    const loginPassword = this.inputPassword

    try {
      const userCredentail = await signInWithEmailAndPassword(this.authService.auth, loginEmail, loginPassword)
      console.log('loggin succes', userCredentail.user)
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential')
        console.log('login failed')
      // showLoginError()
    }
  }

  
/**
 * login guest account with preset Logindata
 */
  async loginGuest(){
    const userCredentail = await signInWithEmailAndPassword(this.authService.auth, 'gast@gast.de', 'gast1234')
    console.log(userCredentail.user)
  }
}
