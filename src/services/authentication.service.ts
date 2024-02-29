import { Injectable } from '@angular/core';
import { User, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
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


    //reacts on changes of the Loginstate
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user

        console.log('if user:', this.auth.currentUser)
        const uid = user.uid;
        this.currentUser = user;
        // ...
      } else {
        //wenn kein user eingeloggt ist
        console.log('if no user', this.auth.currentUser)
        this.router.navigate(['/login'])
      }
    });
  }

  async signout() {
    await signOut(this.auth).then(() => {
      console.log('logout')
    }).catch((error) => {
      console.log('logout error', error)
    });
  }

  async updateUser(user: any, username: string, imgUrl: string,) {
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
}
