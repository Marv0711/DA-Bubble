import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, doc, getDoc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { User } from '../models/user.class';


@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {

  // Import Firestore and inject it
  firestore: Firestore = inject(Firestore);

  // Firestore collection for thread answers
  dbAnswer;

  // Firestore collection for general chats
  dbChat;

  // Details of the current user
  currentUser!: any;
  loginName: string = "";
  userMail: string = "";
  userImage: string = "";
  userOnlineStatus!: boolean
  userID: string = "";
  user = new User();

  // Array to store all user data
  allUserList: any = []

  //user Subscribtions
  getUserID;
  getAllUser;

  // Download URL for user profile image
  donwloadUrl: string = "";


  constructor() {
    this.getUserID = this.subUserID(this.userMail, this.donwloadUrl);
    this.getAllUser = this.subAllUser();
    this.dbChat = collection(this.firestore, 'chat');
    this.dbAnswer = collection(this.firestore, 'thread');
  }

  /**
 * Lifecycle hook that is called when the component is destroyed.
 * Unsubscribes from all snapshot listeners to prevent memory leaks.
 */
  ngOnDestroy() {

  }


  /**
   * Retrieves a reference to the 'users' collection in Firestore.
   * @returns A reference to the 'users' collection.
   */
  getUserRef() {
    return collection(this.firestore, 'users');
  }


  /**
 * Retrieves a specific user document from Firestore based on the provided document ID.
 * @param docID The ID of the user document to retrieve.
 * @returns A reference to the specified user document.
 */
  getUser(docID: string) {
    return doc(collection(this.firestore, 'users'), docID);
  }


  /**
 * Adds a new user to the Firestore 'users' collection.
 * This function adds the user object, serialized as JSON, to the 'users' collection in Firestore.
 * @remarks
 * Ensure that `this.user` contains the user object to be added.
 */
  async addUser() {
    let user = await addDoc(collection(this.firestore, 'users'), this.user.toJSON());
    return user.id
  }


  /**
   * Retrieves a user document from Firestore based on the provided document reference,
   * converts it into a User object, and sets it as the currentUser property.
   * @param docRef The reference to the user document to retrieve.
   */
  async getUserJSON(docRef: DocumentReference) {
    const docSnap = await getDoc(docRef);
    let user = docSnap.data();
    this.currentUser = new User(user)
  }


  /**
   * Updates a user document in Firestore with the provided data object.
   * @param userDocRef The reference to the user document to update.
   * @param object The data object containing the fields to update.
   */
  async updateUser(userDocRef: DocumentReference, object: {}) {
    await updateDoc(userDocRef, object)
  }


  /**
   * Subscribes to changes in the user list to populate the list of all users.
   * @returns A function to unsubscribe from the snapshot listener.
   */
  subAllUser() {
    return onSnapshot(this.getUserRef(), (list) => {
      this.allUserList = [];
      list.forEach(element => {
        this.allUserList.push(this.setUserListObject(element.data()));
      });
    });
  }


  /**
   * Constructs a user object with specified properties, using provided values or defaults.
   * @param obj The object containing properties to include in the user object.
   * @returns A user object with specified properties.
   */
  setUserListObject(obj: any) {
    return {
      name: obj.name || "",
      mail: obj.mail || "",
      online: obj.online || false,
      profileImg: obj.profileImg || "",
    }
  }


  /**
   * Subscribes to changes in the user list to find the user ID associated with a given email.
   * If the user ID is not already set and the user email matches the provided email, updates the user ID and profile image path.
   * @param userMail The email of the user to find the user ID for.
   * @param downloadUrl The URL of the new profile image.
   * @returns A function to unsubscribe from the snapshot listener.
   */
  subUserID(userMail: string, downloadUrl: string) {
    return onSnapshot(this.getUserRef(), (list) => {
      list.forEach(element => {
        if (element.data()['mail'] == userMail && this.userID === "") {
          this.userID = element.id;
          this.UpdateProfileImgPath(downloadUrl);
        }
      });
    });
  }


  /**
   * Updates the profile image path for a user.
   * @param downloadUrl The URL of the new profile image.
   */
  UpdateProfileImgPath(downloadUrl: string) {
    let Userdoc = this.getUser(this.userID);

    if (downloadUrl && Userdoc) {
      updateDoc(Userdoc, {
        profileImg: downloadUrl
      })
    } 
  }


  /**
   * Sort array by the right date and time
   * @param array to be sorted
   * @returns the date, if its the the same date => the time
   */
  sortArray(array: any[]) {
    return array.sort(function (x: any, y: any) {
      const dateX = new Date(x.date).getTime();
      const dateY = new Date(y.date).getTime();
      const timeX = new Date(x.time).getTime();
      const timeY = new Date(y.time).getTime();

      if (dateX === dateY) {
        return timeX - timeY;
      } else {
        return dateX - dateY;
      }
    });
  }



}
