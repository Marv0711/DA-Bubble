import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, signInWithPopup, deleteUser, sendPasswordResetEmail, signOut, sendSignInLinkToEmail, GoogleAuthProvider, signInWithRedirect, sendEmailVerification, UserCredential, User } from '@angular/fire/auth';
import { FirestoreServiceService } from './firestore-service.service';
import { initializeApp } from '@angular/fire/app';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://dabubble.page.link/NLtk',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.dabubble.ios'
    },
    android: {
      packageName: 'com.dabubble.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'dabubble.page.link'
  };


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
  googleAuthProvider = new GoogleAuthProvider();


  constructor(private router: Router, public fss: FirestoreServiceService) {
    this.loginListener() // nicht löschen. Deaktieveren wenn es beim programmieren stört
    this.auth.useDeviceLanguage()
  }


  /**
   * starts a googlelogin pupop 
   */
  async googleLogin() {
    await signInWithPopup(this.auth, this.googleAuthProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        const user = result.user;
        this.currentUser = user
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  /**
   * send verification E-Mail
   * @param user current user / auth.currentUser
   */
  async sendEmail(user: User) {
    await sendEmailVerification(user)
      .then(() => {
        // Email verification sent!
        // ...
      });
  }
  /**
   * send email to reset password
   * @param email user email
   */
  resetPassword(email: string) {
    sendPasswordResetEmail(this.auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }


  /**
   * delete user
   */
  deleteUser() {
    deleteUser(this.auth.currentUser!).then(() => {
      // User deleted.
    }).catch((error) => {
      console.log('user deleted')
    });
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
        } else {
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
