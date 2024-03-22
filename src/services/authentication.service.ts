import { HostListener, Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, signInWithPopup, sendPasswordResetEmail, signOut, sendSignInLinkToEmail, GoogleAuthProvider, signInWithRedirect, sendEmailVerification, UserCredential, User } from '@angular/fire/auth';
import { FirestoreServiceService } from './firestore-service.service';
import { initializeApp } from '@angular/fire/app';
import { Router } from '@angular/router';
import { onSnapshot } from '@angular/fire/firestore';
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
  auth = getAuth(this.firebaseApp);// Update project config with password policy config

  googleAuthProvider = new GoogleAuthProvider();
  public userList: any

  constructor(private router: Router, public fireService: FirestoreServiceService) {
    this.userList = []
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
        const user = result.user;
        this.currentUser = user
        this.setOnlineStatus(true)
      }).catch((error) => {

        console.log('Google Login fehlgeschlagen')
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
      });
  }
  /**
   * send email to reset password
   * @param email user email
   */
  async resetPassword(email: string): Promise<boolean> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return true; // Erfolgreich zurückgesetzt
    } catch (error) {
      console.error("Fehler beim Zurücksetzen des Passworts:");
      return false; // Fehler beim Zurücksetzen
    }
  }


  /**
   * use this to singout user
   */
  async signout() {

    this.setOnlineStatus(false)
    await signOut(this.auth).then(() => {
      console.log('logout')
    }).catch((error) => {
      console.log('logout error', error)
    });
  }


  /**
   * Reacts on loginstate if user is logged in go to board else go to login
   */
  async loginListener() {
    onAuthStateChanged(this.auth, (user) => {
      // https://firebase.google.com/docs/reference/js/auth.user
      if (user) {
        this.afterLogin()
        console.log(user)
      } else {
        //wenn kein user eingeloggt ist
        console.log('loginstate changed: Logged out', this.auth.currentUser)

        // this.router.navigate(['/login']) //remove this for returning back to login after reload

      }
      this.currentUser = user;
    });
  }


  /**
   * set user online and redirect to board
   */
  afterLogin() {
    if (this.router.url === '/create-account/avatar') {
      this.redirectTo('/board', 2000)

    } else {
      this.redirectTo('/board', 500)
    }
    this.setOnlineStatus(true)
  }


  /**redirect to route:
   * @param url route
   * @param time wait for <time> to redirect
   */
  redirectTo(url: string, time: number) {
    setTimeout(() => {
      this.router.navigate([url])
    }, time);
  }


  /**
   * set onlinestatus in firebase
   * @param bool true /false
   */
  setOnlineStatus(bool: boolean) {
    if (this.userList.length === 0) {
      this.userlist()
    } else {
      let docID = this.getUserId() ?? ""; // Der leere String wird als Standardwert verwendet, wenn getUserId() undefined ist
      let user = this.fireService.getUser(docID);
      this.fireService.updateUser(user, {
        online: bool
      });
    }
  }


  /**
   * get the docID from the current User
   * @returns docID
   */
  getUserId(): string | undefined {
    let docID: string | undefined;
    this.userList.forEach((user: any) => {
      if (user.mail === this.auth.currentUser?.email) {
        docID = user.docID;
      }
    });
    return docID;
  }


  /**
   * get all users from firbase and push it into a array
   */
  async userlist() {
    this.userList = [];
    let users = this.fireService.getUserRef();
    onSnapshot(users, (list) => {
      list.forEach(element => {
        let user = this.fireService.getUser(element.id);
        this.fireService.updateUser(user, {
          docID: element.id
        });
        let data = element.data();
        // Überprüfen, ob die docID bereits im userList vorhanden ist
        if (!this.userList.some((user: { docID: string; }) => user.docID === element.id)) {
          this.userList.push(data);
        }
      });
    });
  }



  
  getUserOnlineStatus(email: string) {
    console.log(this.userList)
    for (let i = 0; i < this.userList.length; i++) {
      const user = this.userList[i];
      if (user.mail == email) {
        return user.online
      }
      else false
    }
  }

}
