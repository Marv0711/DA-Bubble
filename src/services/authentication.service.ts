import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FirestoreServiceService } from './firestore-service.service';
import { initializeApp } from '@angular/fire/app';


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

  auth = getAuth(this.firebaseApp)

  constructor(public fss: FirestoreServiceService) {

  }



}
