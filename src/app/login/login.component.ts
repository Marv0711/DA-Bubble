import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LogoComponent } from '../logo/logo.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FirestoreServiceService, } from '../../services/firestore-service.service';
import { AuthenticationService } from '../../services/authentication.service';
import { signInWithEmailAndPassword } from '@angular/fire/auth';
import { StorageService } from '../../services/storage.service';
import { StorageReference } from '@angular/fire/storage';
import { getStorage, ref, uploadBytes } from '@angular/fire/storage';


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

  hide = true;
  inputPassword!: string;
  inputMail!: string;
  images: any
  spaceRef: any
  constructor(public storageService: StorageService, public firestoreService: FirestoreServiceService, public authService: AuthenticationService, private router: Router) {

  }

  async ngOnInit(): Promise<any> {
    this.logutIfUserIsLoggedIn()
  }

  // if you logged in and you return back somehow to the login window. You will be logged out automaticly
  async logutIfUserIsLoggedIn() {
    if (this.authService.auth.currentUser !== null) {
      await this.authService.signout()
      this.authService.currentUser = this.authService.auth.currentUser
      console.log('user automatisch ausgeloggt', this.authService.currentUser)
    }
  }

  // async onSubmit(form: NgForm) {
  //   if (form.valid) {
  //     // Formular ist gültig, hier kannst du die Übermittlung der Daten implementieren
  //     await this.firestoreService.checkRightUser(this.inputPassword, this.inputMail);
  //     if(this.firestoreService.loginComplete){
  //       this.router.navigateByUrl('/board')
  //     }
  //     console.log('Formular übermittelt!', form.value);
  //   } else {
  //     // Formular ist ungültig, hier kannst du entsprechend reagieren (z.B. Fehlermeldungen anzeigen)
  //     console.error('Formular ist ungültig!');
  //   }
  // }


  async onSubmit(form: NgForm) {
    if (form.valid) {

      await this.loginEmailPassword()

    } else {
      // Formular ist ungültig, hier kannst du entsprechend reagieren (z.B. Fehlermeldungen anzeigen)
      console.error('Formular ist ungültig!');
    }
  }

  goToBoard() {
    if (this.firestoreService.loginComplete) {
      return '/board'
    }
    else {
      return '/default';
    }
  }

  async loginEmailPassword() {
    const loginEmail = this.inputMail
    const loginPassword = this.inputPassword

    try {
      const userCredentail = await signInWithEmailAndPassword(this.authService.auth, loginEmail, loginPassword)
      console.log(userCredentail.user)
      this.router.navigate(['/board'])
      console.log('loggin succes')

    } catch (err: any) {
      if (err.code === 'auth/invalid-credential')
        console.log('login failed')
      // showLoginError()
    }
  }

  async loginGuest(){
    const userCredentail = await signInWithEmailAndPassword(this.authService.auth, 'gast@gast.de', 'gast1234')
    console.log(userCredentail.user)


  }
}
