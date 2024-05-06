import { Injectable, inject } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, addDoc, arrayUnion, collection, doc, getDoc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { User } from '../models/user.class';
import { Chat } from '../models/chat.class';
import { Channel } from '../models/channel.class';
import { privatChat } from '../models/privatChat.class';
import { FirestoreServiceService } from './firestore-service.service';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  channel = new Channel();
  channelID: string = ''
  channelName = '';
  channelListNamesArray: any = [];
  channelDescription = '';
  UserName = '';
  author = ''
  channelUserAmount!: number;
  unsubchannel;

  // Array to store channel list data
  channelList: any = [];

  // List of profile images for channel users
  channelProfileImagesList: any = []



  constructor(private firestoreService: FirestoreServiceService,
    private authService: AuthenticationService
  ) {
    this.unsubchannel = this.subChannelList();
  }


  ngOnDestroy() {
    this.unsubchannel

  }
  
  /**
 * Retrieves a reference to the 'channels' collection in Firestore.
 * @returns A reference to the 'channels' collection in Firestore.
 */
  getChannelRef() {
    return collection(this.firestoreService.firestore, 'channels');
  }


  /**
   * Retrieves a reference to the document of the current channel.
   * @returns A reference to the document of the current channel.
   */
  getChannelDoc() {
    return doc(collection(this.firestoreService.firestore, 'channels'), this.channelID);
  }


  /**
   * Retrieves a reference to the document of the channelid.
   * @returns A reference to the document of the selected channel.
   */
  getChannelDocByID(ID:string) {
    return doc(collection(this.firestoreService.firestore, 'channels'), ID);
  }

  /**
 * Adds a new channel to the Firestore database.
 * @param channel The channel object to add to the database.
 */
  addChannel() {
    addDoc(collection(this.firestoreService.firestore, 'channels'), this.channel.toJSON());
  }

  async updateChannel(channelRef: DocumentReference, object: {}) {
    await updateDoc(channelRef, object)
  }



  /**
   * Sets the channel name based on the provided channel ID.
   * @param channelID The ID of the channel to set as the channel name.
   */
  getChannelName(name: string) {
    this.channelName = name;
  }

  getDescription(text: string) {
    this.channelDescription = text;
  }

  getUserName(name: string) {
    this.UserName = name;
  }

  getAuthor(author: string) {
    this.author = author;
  }

  /**
 * Constructs a channel object with specified properties, using provided values or defaults.
 * @param obj The object containing properties to include in the channel object.
 * @param id The ID of the channel.
 * @returns A channel object with specified properties.
 */
  setChannelObject(obj: any, id: string) {
    return {
      id: id || "",
      name: obj.name || "",
      users: obj.users || "",
      description: obj.description || "",
      author: obj.author || ""
    }
  }


  /**
   * Subscribes to changes in the channel list for the current user.
   * @returns A function to unsubscribe from the snapshot listener.
   */
  subChannelList() {
    return onSnapshot(this.getChannelRef(), (list) => {
      this.channelList = [];
      this.channelListNamesArray = [];
      list.forEach(element => {
        if (element.data()['users'].includes(this.firestoreService.currentUser?.email)) {
          this.channelList.push(this.setChannelObject(element.data(), element.id));
          this.channelListNamesArray.push(element.data()['name']);
        }
      });
    })
  };


  /**
   * Retrieves the profile images of users in the provided list and populates the channel profile images list.
   * @param channelUserList The list of users in the channel.
   */
  getUsersImages(channelUserList: any) {
    this.channelProfileImagesList = [];
    for (let index = 0; index < channelUserList.length; index++) {
      let element = channelUserList[index];
      this.firestoreService.allUserList.forEach((alluser: any) => {
        if (element == alluser.mail) {
          this.channelProfileImagesList.push(alluser.profileImg)
        };
      });
    }
  }


  async reloadImages() {
    this.channelProfileImagesList = [];
    let channelDoc = this.getChannelDoc();
    let channelDocSnapshot = await getDoc(channelDoc);

    let channelUserList = channelDocSnapshot.data()?.['users']
    this.getUsersImages(channelUserList);
  }


  /**
   * Retrieves the list of user profile images associated with the current channel.
   * @returns An array containing the list of user profile images.
   */
  getUserImagesList() {
    return this.channelProfileImagesList;
  }


  /**
   * Updates the list of users in a channel by adding a new user.
   * @param newMail The email of the new user to add to the channel.
   */
  async UpdateChannelUsers(newMail: string) {
    let channelDoc = this.getChannelDoc();

    let channelDocSnapshot = await getDoc(channelDoc);
    let userData = channelDocSnapshot.data()?.['users'] || [];

    if (!userData.includes(newMail)) {
      updateDoc(channelDoc, {
        users: arrayUnion(newMail)
      })
      this.getUsersCounter(this.channelID);
      this.reloadImages();
    }
  }



  /**
   * Retrieves the number of users in the specified channel.
   * @param channelID The ID of the channel for which to retrieve the user count.
   */
  async getUsersCounter(channelID: string) {
    const docRef = doc(collection(this.firestoreService.firestore, 'channels'), channelID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.channelUserAmount = docSnap.data()['users'].length;
    } else {

    }
  }



  async removeUserFormChannel() {
    const channelDoc = this.getChannelDoc();
    const channelDocSnapshot = await getDoc(channelDoc);
    const userData = channelDocSnapshot.data()?.['users'] || [];

    for (let i = 0; i < userData.length; i++) {
      const userMail = userData[i];
      if (userMail === this.authService.auth.currentUser?.email) {
        this.removeUser(i, userData, channelDoc)
      }
    }
  }


  /**
   * removes the user from the channel in firabase
   * @param i index
   * @param userData users array from channel object
   * @param channelDoc doc ref from your channel in firebase
   */
  async removeUser(i: number, userData: Array<any>, channelDoc: DocumentReference<DocumentData, DocumentData>) {
    userData.splice(i, 1)
    await this.updateChannel(channelDoc, {
      users: userData
    })
  }

  /**
   * Add all deafault channels to the user
   */
  async addDefaultChannels() {
    const allgemeinChannelID = '9est2kCJ45ZFKDuy8ry1'
    const officeChannelID = 'NEiKXyQjwWZUgTFJ2yjn'
    const entwicklerChannelID = 'wC4dtx6hGd37AgEC0ZXO'
    this.addUserToChannel(allgemeinChannelID)
    this.addUserToChannel(officeChannelID)
    this.addUserToChannel(entwicklerChannelID)
  }



/**
 * 
 * @param channelDoc the doc id from the channel in firebase 
 */
  async addUserToChannel(channelDoc: string) {
    let channelRef = this.getChannelDocByID(channelDoc)
    const channelDocSnapshot = await getDoc(channelRef);
    const userData = channelDocSnapshot.data()?.['users'] || [];

    userData.push(this.authService.auth.currentUser?.email)

    await this.updateChannel(channelRef, {
      users: userData
    })
  }
 


}
