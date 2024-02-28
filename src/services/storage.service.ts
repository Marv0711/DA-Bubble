import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getStorage, ref } from '@angular/fire/storage';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',

})


export class StorageService {

  constructor(public authService: AuthenticationService) { }

  firebaseConfig = {
    apiKey: "AIzaSyAnNCwhxSLpbuP1fr4sqbQI8RejrekJQx0",
    authDomain: "da-bubble-ba214.firebaseapp.com",
    projectId: "da-bubble-ba214",
    storageBucket: "da-bubble-ba214.appspot.com",
    messagingSenderId: "870561361775",
    appId: "1:870561361775:web:c678204a520fb2707dc29a"
  }

  app = initializeApp(this.firebaseConfig);
  storage = getStorage()
  storageRef = ref(this.storage)


  // Erstellt einen Pfad oder einen Pfad zu einer Datei let pfad = createFileDirection('pfad im firebase storage')
  createFileDirection(path: string) {
    const reference = ref(this.storage, path)
    console.log('Dateipfad ist:', reference)
    return reference

  }

}








