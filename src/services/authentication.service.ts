import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { FirestoreServiceService } from './firestore-service.service';
import { initializeApp } from '@angular/fire/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  firebaseApp = initializeApp({
    "projectId": "da-bubble-ba214",
    "appId": "1:870561361775:web:c678204a520fb2707dc29a",
    "storageBucket": "da-bubble-ba214.appspot.com",
    "apiKey": "AIzaSyAnNCwhxSLpbuP1fr4sqbQI8RejrekJQx0",
    "authDomain": "da-bubble-ba214.firebaseapp.com",
    "messagingSenderId": "870561361775"
  })
  emailRegex: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\u0022(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\u0022)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  currentUser!: any
  auth = getAuth(this.firebaseApp);


  constructor(private router: Router, public fss: FirestoreServiceService) {
    // this.loginListener() // nicht löschen. Deaktieveren wenn es beim programmieren stört
  }


  /**
   * use this to singout user
   */
  async signout() {
    await signOut(this.auth).then(() => {
      console.log('logout')
    }).catch((error) => {
      console.log('logout error', error)
    });
  }


  /**
   * Reacts on loginstate if user is logged in go to board else go to login
   */
  loginListener() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log('loginstate changed: Logged in:', this.auth.currentUser)
        if (this.router.url === '/create-account/avatar') {
          setTimeout(() => {
            this.router.navigate(['/board'])
          }, 2000);
        }else{
          this.router.navigate(['/board'])
        }


      } else {
        //wenn kein user eingeloggt ist
        console.log('loginstate changed: Logged out', this.auth.currentUser)

        this.router.navigate(['/login'])
      }
      this.currentUser = user;

    });
  }
}
