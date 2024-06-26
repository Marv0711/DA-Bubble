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
import { GoogleAuthProvider, getRedirectResult, signInWithEmailAndPassword } from '@angular/fire/auth';
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
  loginstatus: boolean = false;
  constructor(
    public storageService: StorageService,
    public firestoreService: FirestoreServiceService,
    public authService: AuthenticationService,
  ) {
  }

  async ngOnInit(): Promise<any> {

    this.loginstatus = false;
    await this.logutIfUserIsLoggedIn()
    this.animation()
    this.authService.userlist()
  }


  // if you logged in and you return back somehow to the login window. You will be logged out automaticly
  async logutIfUserIsLoggedIn() {
    if (this.authService.auth.currentUser !== null) {
      await this.authService.signout()
      this.authService.currentUser = this.authService.auth.currentUser

    }
  }


  /**
   * Loginlogic
   * @param form the form from the inputcontainer in the HTML doc
   */
  async onSubmit(form: NgForm) {
    if (form.valid) {
      //formular gültig
      this.loginstatus = await this.loginEmailPassword(form)
      if (!this.loginstatus) {
        //möglicher code wenn login fehlgeschalgen ist
      }
    } else {
      //formular ungültig
    }
  }


  /**
   *Log the user into the Firebase with email and passwort 
   */
  async loginEmailPassword(form: NgForm) {
    const loginEmail = this.inputMail
    const loginPassword = this.inputPassword

    try {
      const userCredentail = await signInWithEmailAndPassword(this.authService.auth, loginEmail, loginPassword)

      return true
    } catch (err: any) {
      return false
    }
  }


  /**
   * login guest account with preset Logindata
   */
  async loginGuest() {

    const userCredentail = await signInWithEmailAndPassword(this.authService.auth, 'gast@gast.de', 'gast1234')
    this.loginstatus = true

  }


  animation() {
    let body = document.getElementsByTagName('body')[0];
    let aniContainer = document.querySelectorAll('.animation-container')[0] as HTMLElement; // Zugriff auf das erste Element
    let aniContainer3 = document.querySelectorAll('.animation-container3')[0] as HTMLElement; // Zugriff auf das erste Element

    body.style.overflowY = 'hidden';
    setTimeout(() => {
      body.style.overflowY = 'scroll';
      aniContainer.style.display = 'none';
      aniContainer3.style.display = 'none';

    }, 3000);
  }
}
