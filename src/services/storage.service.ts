import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { StorageReference, getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { AuthenticationService } from './authentication.service';


interface StoragePath {
  fullPath: string;
}


@Injectable({
  providedIn: 'root',

})


export class StorageService {

  constructor(public authService: AuthenticationService) {
    this.imageUrl = ''
    this.storageImgUrl = ''
    this.defaultImageUrl = '../../../assets/img/avatars/profile-image.png'; //default image on create Avatar
  }

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
  currentFile!: File
  imageUrl: string  // Variable zum Speichern der URL des hochgeladenen Bildes / offline
  imageReference!: any
  storageImgUrl: string
  defaultImageUrl: string

  /**
   * This function triggers the file selection and saves the File in the furrentFile!
   * @param event the file selection ecent to look for a image on your machine
   */
  selectFile(event: any) {
    const file: File = event.target.files[0]; // Die ausgewählte Datei
    this.currentFile = file
    console.log(this.currentFile)
    // Bild in Basis64-Kodierung konvertieren und in die URL einfügen
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  async uploadFile(storageSaveLocation: string) {
    let file: File = this.currentFile
    let path = this.createFileDirection(storageSaveLocation + file.name)
    await this.uploadToStorage(path, file)
    console.info('File upload succes!')
    return path
  }



  async uploadToStorage(path: StorageReference, file: File) {
    await uploadBytes(path, file)
  }


  async getStorageUrl(path: StoragePath) {
    let storageUrl = await this.getUrl(path.fullPath)
    console.log('Storage Url:' + storageUrl)
    return storageUrl
  }

  async getUrl(path: string) {
    try {
      const url = await getDownloadURL(ref(this.storage, path));
      return url;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  // Erstellt einen Pfad oder einen Pfad zu einer Datei | let pfad = createFileDirection('pfad im firebase storage')
  createFileDirection(path: string) {
    const reference = ref(this.storage, path)
    console.log('Dateipfad ist:', reference)
    this.imageReference = reference
    return reference
  }

}








