import { Injectable } from '@angular/core';
import { User, getAuth, onAuthStateChanged, signOut, updateProfile } from '@angular/fire/auth';
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

  currentUser!: any
  auth = getAuth(this.firebaseApp)
  constructor(private router: Router, public fss: FirestoreServiceService) {
    this.loginListener() // nicht löschen. Deaktieveren wenn es beim programmieren stört
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
   * 
   * @param user needs a userCredentail.user /the user you want to change
   * @param username the new username
   * @param imgUrl the new profilepicture path
   */
  async updateUser(user: User, username: string, imgUrl: string,) {
    console.log('updating user')
    await updateProfile(user, {
      displayName: username, photoURL: imgUrl
    }).then(() => {
      console.log('Displayname set to:', user.displayName)
      console.log('photoURL set to:', user.photoURL)
      console.log('Email set to:', user.email)
    }).catch((error) => {
      console.log('error', error)
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
        this.router.navigate(['/board'])
      } else {
        //wenn kein user eingeloggt ist
        console.log('loginstate changed: Logged out', this.auth.currentUser)

        this.router.navigate(['/login'])
      }
      this.currentUser = user;
      
    });
  }
}
