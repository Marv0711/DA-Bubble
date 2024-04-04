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
    this.defaultImageUrl = '../../../assets/img/avatars/profile-image.png'; //default image on create Avatar
    this.defaultImageStorageUrl = 'gs://da-bubble-ba214.appspot.com/profileImages/avatars'
    this.imageUrl = ''
    this.storageImgUrl = ''
    this.threadImageUrl = ''
    this.privateChatImageUrl = ''
    this.editProfileImgUrl = ''
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
  currentFile!: File  //current File you upoloaded
  imageUrl: string  //varaible for saving the url of the current image / offline not to firebase
  imageReference!: any;
  storageImgUrl: string // the current url of the image you uploaded to the storage
  defaultImageUrl: string
  defaultImageStorageUrl: string
  threadImageUrl: string
  privateChatImageUrl: string
  editProfileImgUrl: String
  /**
   *               <==========Tutorial==========>
   * 
   * 
   * select a File with the selectFile(event) function.  
   
   * You can get the event through the input type file= 
  
            <input
              type="file"
              (change)="storageService.selectFile($event)"
              accept="image/*"
              style="display: none"
              #fileInput
            />
            <button (click)="fileInput.click()">

  * the file will be saved in the currentFile variable, its not online yet
  
  * use uploadFile(storageSaveLocation) to upload the file into the storage
  * example location: storageSaveLocation = 'profileImages/'   
  * 
  * to get the downloadlink for your uploaded File you can save the path in a varaible
    example:
    let path = await this.storageService.uploadFile('profileImages/')
    let url = await this.storageService.getStorageUrl(path)
    this.storageService.storageImgUrl = url!

  * the Url ist now saved in storagService.storageImgUrl
  * dont forget to reset all variables for safty reasons
  * Ask Daniel for more details
  * or https://firebase.google.com/docs/storage/web/start?hl=de
  *              </ ==========Tutorial========== >
  */


  /**
   * This function triggers the file selection and saves the File in the currentFile!
   * @param event the file selection event to look for a image on your machine
   */
  /**
  * Selects a file and processes it.
  * @param event The file select event.
  */
  selectFile(event: any, path: string): void {
    const file: File = event.target.files[0];
    this.currentFile = file;
    console.log('Current File:', this.currentFile);
    this.processFile(file, (result: string) => {
      this.setImageUrl(result, path);
    });
  }

  private setImageUrl(result: string, path: string): void {
    switch (path) {
      case 'thread':
        this.threadImageUrl = result;
        break;
      case 'privateChat':
        this.privateChatImageUrl = result;
        break;
      case 'edit':
        this.editProfileImgUrl = result;
        break;
      default:
        this.imageUrl = result;
        break;
    }
  }


  /**
   * Processes the selected file.
   * @param file The selected file.
   * @param callback The callback function to handle the processed file result.
   */
  private processFile(file: File, callback: (result: string) => void): void {
    const reader = new FileReader();
    reader.onload = () => {
      callback(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  /**
   * Uploads the selected File to the Storage and creates the end path 
   * @param storageSaveLocation the path where you want to save the file in the Store
   * @returns the path to the storage if needed / not necessary
   */
  async uploadFile(storageSaveLocation: string) {
    let file: File = this.currentFile
    let path = this.createFileDirection(storageSaveLocation + file.name)
    await this.uploadToStorage(path, file)
    console.info('File upload succes!')
    return path
  }


  /**
   * Creats a path to a File in a folder
   * let pfad = createFileDirection('path') path= 'profileImages/'  
   * the> / < slash is important!
   * @param path 
   * @returns reference to the path
   */
  createFileDirection(path: string) {
    const reference = ref(this.storage, path)
    console.log('Dateipfad ist:', reference)
    this.imageReference = reference
    return reference
  }


  /**
   * Uploads the file to storage
   * @param path the end Reference/Path where you want to save the File
   * @param file the File you want to upload
   */
  async uploadToStorage(path: StorageReference, file: File) {
    await uploadBytes(path, file)
  }


  /**
   * creates a donwload Url for a File in the Storage
   * @param path the correct storage path to the File
   * @returns the download url as String
   */
  async getStorageUrl(path: StoragePath) {
    let storageUrl = await this.getUrl(path.fullPath)
    console.log('Storage Url:' + storageUrl)
    return storageUrl
  }


  /**
   *  creates a donwload Url for a File in the Storage like getStorageUrl. But on annother way. Choose one we will delete it later
   * @param path 
   * @returns the download url 
   */
  async getUrl(path: string) {
    const url = await getDownloadURL(ref(this.storage, path));
    console.log('getUrl:' + url)
    return url;
  }


  /**
   * resets all variables
   */
  resetData() {
    this.currentFile = new File([], 'empty');
    this.imageUrl = ''
    this.threadImageUrl = ''
    this.privateChatImageUrl = ''
    this.editProfileImgUrl = ''
    this.storageImgUrl = ''
    this.imageReference = null

  }

}








