import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from '@angular/fire/firestore';
import { User } from '../models/user.class';
import { Chat } from '../models/chat.class';
import { AuthenticationService } from './authentication.service';
import { Channel } from '../models/channel.class';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThreadChat } from '../models/threadChat.class';
import { privatChat } from '../models/privatChat.class';


@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {
  // Import Firestore and inject it
  firestore: Firestore = inject(Firestore);
  //thread
  // Initialize ThreadChat object for thread answers
  ThreadAnswer = new ThreadChat();
  // Array to store thread list data
  threadList: any = [];
  ALLthreadList: any = [];
  // Firestore collection for thread answers
  dbAnswer;
  // Subscription for thread answer updates
  unsubAnswer;
  unsubALLsubAnswer;
  //chat
  // Initialize Chat object for general chats
  chat = new Chat();
  // Initialize PrivateChat object for private chats
  privatChat = new privatChat();
  // Array to store chat list data
  chatList: any = [];
  // Variable to control chat switching
  chatSwitch: number = 0;
  // Subscription for general chat updates
  unsubChat;
  // Subscription for private chat updates
  unsubPrivateChat;
  // Firestore collection for general chats
  dbChat;
  // ID of the current chat
  currentChatID!: string;
  // Details of the current contact user
  currentContactUser!: any
  //threadvaraibel
  // Login name for thread chats
  loginName: string = "";
  // Text for thread chats
  threadChatText: string = '';
  // Login name for thread chats
  threadChatloginName: string = '';
  // Time for thread chats
  threadChatTime: string = '';
  //login
  // Initialize User object for user details
  user = new User();
  // Details of the current user
  currentUser!: any;
  // Email of the user
  userMail: string = "";
  // ID of the user
  userImage: string = "";
  // ID of the user
  userID: string = "";
  // Subscription for user ID retrieval
  getUserID;
  // Subscription for retrieving all users
  getAllUser;
  // Array to store all user data
  allUserList: any = []
  // Download URL for user profile image
  donwloadUrl: string = "";
  //channel
  // Subscription for channel updates
  unsubchannel;
  // Initialize Channel object for channel details
  channel = new Channel();
  // Array to store channel list data
  channelList: any = [];
  // ID of the current channel
  channelID: string = 'C6ZgPK9OjzZxv2xjdqOz'
  // Name of the channel
  channelName = '';
  // Number of users in the channel
  channelUserAmount!: number;
  // Details of the current chat
  currentChat!: Chat;
  // List of profile images for channel users
  channelProfileImagesList: any = []
  // Details of the current channel users
  currentChannelUsers: any;
  chatMail: string = '';





  /**
   * Creates a new instance of the class.
   * Initializes subscriptions and Firestore collections.
   */
  constructor() {
    // Subscribe to private chat list
    this.unsubPrivateChat = this.subPrivateChatList();
    // Subscribe to chat list for the current channel
    this.unsubChat = this.subChatList(this.channelID);
    // Subscribe to channel list
    this.unsubchannel = this.subChannelList();
    // Subscribe to user ID retrieval
    this.getUserID = this.subUserID(this.userMail, this.donwloadUrl);
    // Subscribe to all user list
    this.getAllUser = this.subAllUser();
    // Initialize Firestore collection for chat
    this.dbChat = collection(this.firestore, 'chat');
    // Subscribe to thread answer list
    this.unsubAnswer = this.subThreadList();
    this.unsubALLsubAnswer = this.subALLThreadList();
    // Initialize Firestore collection for thread answer
    this.dbAnswer = collection(this.firestore, 'thread');
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
    await addDoc(collection(this.firestore, 'users'), this.user.toJSON());
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

  //chat

  /**
   * Retrieves a reference to the 'chat' collection in Firestore.
   * @returns A reference to the 'chat' collection.
   */
  getChatRef() {
    return collection(this.firestore, 'chat');
  }

  /**
   * Retrieves a specific chat document from Firestore based on the provided document ID.
   * @param docID The ID of the chat document to retrieve.
   * @returns A reference to the specified chat document.
   */
  getChat(docID: string) {
    return doc(collection(this.firestore, 'chat'), docID);
  }

  /**
   * Retrieves a reference to the 'privateChat' collection in Firestore.
   * @returns A reference to the 'privateChat' collection.
   */
  getPrivateChatRef() {
    return collection(this.firestore, 'privateChat');
  }

  /**
   * Retrieves a specific private chat document from Firestore based on the provided document ID.
   * @param docID The ID of the private chat document to retrieve.
   * @returns A reference to the specified private chat document.
   */
  getPrivateChat(docID: string) {
    return doc(collection(this.firestore, 'privateChat'), docID);
  }

  /**
   * Sets the current chat ID and subscribes to the thread list for the current chat.
   * @param chatID The ID of the chat to set as the current chat.
   */
  setCurrentChat(chatID: string) {
    this.currentChatID = chatID;
    this.subThreadList();
  }

  /**
   * Constructs a chat object with specified properties, using provided values or defaults.
   * @param obj The object containing properties to include in the chat object.
   * @param id The ID of the chat object.
   * @returns A chat object with specified properties.
   */
  setChatObject(obj: any, id: string) {
    return {
      id: id || "",
      textAreaInput: obj.textAreaInput || "",
      chatTime: obj.chatTime || "",
      chatDate: obj.chatDate || "",
      loginName: obj.loginName || "",
      emoji: obj.emoji || "",
      profileImg: obj.profileImg || "kein img vorhanden",
      mail: obj.mail || 'email@nichtVorhanden.de'
    }
  }

  /**
   * Constructs a private chat object with specified properties, using provided values or defaults.
   * @param obj The object containing properties to include in the private chat object.
   * @returns A private chat object with specified properties.
   */
  setPrivateChatObject(obj: any) {
    return {
      member: obj.member || "",
      textAreaInput: obj.textAreaInput || "",
      chatTime: obj.chatTime || "",
      loginName: obj.loginName || "",
      emoji: obj.emoji || "",
      profileImg: obj.profileImg || "",
      email: obj.email || 'email@nichtVorhanden.de'
    }
  }

  /**
   * Saves a chat to the Firestore database.
   */
  saveChat() {
    addDoc(this.dbChat, this.chat.toJSON());
  }

  /**
   * Saves a private chat to the Firestore database.
   */
  savePrivateChat() {
    addDoc(collection(this.firestore, 'privateChat'), this.privatChat.toJSON());
  }

  /**
   * Adds a new channel to the Firestore database.
   * @param channel The channel object to add to the database.
   */
  addChannel() {
    addDoc(collection(this.firestore, 'channels'), this.channel.toJSON());
  }

  /**
   * Sets the current contact user and subscribes to the private chat list.
   * @param user The user to set as the current contact user.
   */
  getOtherUser(user: any) {
    this.currentContactUser = user;
    this.subPrivateChatList();
  }

  /**
   * Subscribes to changes in the private chat list to populate the chat list.
   * Filters the chat list based on the current contact user's email.
   * @returns A function to unsubscribe from the snapshot listener.
   */
  subPrivateChatList() {
    return onSnapshot(this.getPrivateChatRef(), (list) => {
      this.chatList = [];
      if (this.currentContactUser) {
        list.forEach(element => {
          if (element.data()['member'].includes(this.currentContactUser.mail)) {
            this.chatList.push(this.setPrivateChatObject(element.data()));
            this.chatList = this.chatList.sort(function (x: any, y: any) {
              return x.chatTime - y.chatTime
            })
          }
        });
      }
    })
  }

  /**
   * Retrieves the list of chats.
   * @returns The list of chats.
   */
  getChats() {
    return this.chatList;
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * Unsubscribes from all snapshot listeners to prevent memory leaks.
   */
  ngOnDestroy() {
    this.subChatList(this.channelID);
    this.subChannelList();
    this.subUserID(this.userMail, this.donwloadUrl);
    this.subAllUser();
    this.subThreadList();
    this.subPrivateChatList();
    this.subALLThreadList();
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
    } else {
      console.error("Ungültige Daten für das Update."); // Debugging-Ausgabe
    }
  }

  /**
   * Subscribes to changes in the chat list for a specified channel.
   * @param docID The ID of the channel to subscribe to for chat updates.
   * @returns A function to unsubscribe from the snapshot listener.
   */
  subChatList(docID: any) {
    this.channelID = docID;
    return onSnapshot(this.getChatRef(), (list) => {
      this.chatList = [];
      list.forEach(element => {
        if (element.data()['id'] == docID) {
          this.chatList.push(this.setChatObject(element.data(), element.id));
          this.chatList = this.chatList.sort(function (x: any, y: any) {
            if (new Date(x.chatDate).getFullYear() === new Date(y.chatDate).getFullYear() &&
              new Date(x.chatDate).getMonth() === new Date(y.chatDate).getMonth() &&
              new Date(x.chatDate).getDate() === new Date(y.chatDate).getDate()) {
              return x.chatTime - y.chatTime;
            } else {
              return x.chatDate - y.chatDate;
            }
          })
        }
      });
    })
  }

  //channel

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
      users: obj.users || ""
    }
  }

  /**
   * Retrieves a reference to the 'channels' collection in Firestore.
   * @returns A reference to the 'channels' collection in Firestore.
   */
  getChannelRef() {
    return collection(this.firestore, 'channels');
  }

  /**
   * Retrieves a reference to the document of the current channel.
   * @returns A reference to the document of the current channel.
   */
  getChannelDoc() {
    return doc(collection(this.firestore, 'channels'), this.channelID);
  }

  /**
   * Retrieves the profile images of users in the provided list and populates the channel profile images list.
   * @param channelUserList The list of users in the channel.
   */
  getUsersImages(channelUserList: any) {
    ;
    this.channelProfileImagesList = [];
    for (let index = 0; index < channelUserList.length; index++) {
      let element = channelUserList[index];
      this.allUserList.forEach((alluser: any) => {
        if (element == alluser.mail) {
          this.channelProfileImagesList.push(alluser.profileImg)
        };
      });
    }
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
      this.getUsersCounter(this.channelID)
    }
  }

  /**
   * Adds an emoji reaction to a chat message.
   * @param emoji The emoji to add as a reaction.
   * @param chatID The ID of the chat message to add the emoji reaction to.
   */
  async addEmojiInChat(emoji: any, chatID: string) {
    let chatDoc = this.getChat(chatID);

    let chatDocSnapshot = await getDoc(chatDoc);
    let chatData = chatDocSnapshot.data()?.['emoji'] || [];
    chatData.push({
      amount: 1,
      type: emoji,
      likerMail: [this.currentUser.email]
    })

    await updateDoc(chatDoc, {
      emoji: chatData
    })
  }

  /**
   * Updates the amount of an emoji reaction in a chat message.
   * @param chatID The ID of the chat message.
   * @param value The value by which to increase or decrease the emoji reaction amount.
   * @param i The index of the emoji reaction in the chat data array.
   */
  async UpdateEmojiAmount(chatID: string, value: number, i: number) {
    let chatDoc = this.getChat(chatID);

    let chatDocSnapshot = await getDoc(chatDoc);
    let chatData = chatDocSnapshot.data()?.['emoji'] || [];

    let newValue = chatData[i]['amount'] + value;

    chatData[i]['amount'] = newValue;

    if (newValue == 0) {
      chatData.splice(i, 1);
      await updateDoc(chatDoc, {
        emoji: chatData
      })
    }
    else {
      if (value === 1) {
        chatData[i]['likerMail'].push(this.currentUser.email);
        await updateDoc(chatDoc, {
          emoji: chatData
        })
      }
      else {
        let index: number = chatData[i]['likerMail'].indexOf(this.currentUser.email);
        if (index != -1) {
          chatData[i]['likerMail'].splice(index, 1);
          await updateDoc(chatDoc, {
            emoji: chatData
          });
        }
      }
    }
  }

  /**
   * Subscribes to changes in the channel list for the current user.
   * @returns A function to unsubscribe from the snapshot listener.
   */
  subChannelList() {
    return onSnapshot(this.getChannelRef(), (list) => {
      this.channelList = [];
      list.forEach(element => {
        if (element.data()['users'].includes(this.currentUser?.email))
          this.channelList.push(this.setChannelObject(element.data(), element.id));
      });
      console.log("Die channelliste", this.channelList);
    })
  };

  /**
   * Sets the channel name based on the provided channel ID.
   * @param channelID The ID of the channel to set as the channel name.
   */
  getChannelName(channelID: string) {
    this.channelName = channelID;
  }

  /**
   * Retrieves the number of users in the specified channel.
   * @param channelID The ID of the channel for which to retrieve the user count.
   */
  async getUsersCounter(channelID: string) {
    const docRef = doc(collection(this.firestore, 'channels'), channelID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.channelUserAmount = docSnap.data()['users'].length;

    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  //thread

  /**
   * Subscribes to changes in the thread list for the current chat.
   * @returns A function to unsubscribe from the snapshot listener.
   */
  subThreadList() {
    return onSnapshot(this.getThreadAnswerRef(), (list) => {
      this.threadList = [];
      console.log('klaus', this.threadList);
      list.forEach(element => {
        if (element.data()['id'] == this.currentChatID) {
          this.threadList.push(this.setThreadObject(element.data()));
          this.threadList = this.threadList.sort(function (x: any, y: any) {
            if (new Date(x.threadDate).getFullYear() === new Date(y.threadDate).getFullYear() &&
              new Date(x.threadDate).getMonth() === new Date(y.threadDate).getMonth() &&
              new Date(x.threadDate).getDate() === new Date(y.threadDate).getDate()) {
              return x.threadTime - y.threadTime;
            } else {
              return x.threadDate - y.threadDate;
            }
          })
        }
      });
    });
  }

  subALLThreadList() {
    return onSnapshot(this.getThreadAnswerRef(), (list) => {
      this.ALLthreadList = [];
      list.forEach(element => {
          this.ALLthreadList.push(this.setThreadObject(element.data()));
          this.ALLthreadList = this.ALLthreadList.sort(function (x: any, y: any) {
            if (new Date(x.threadDate).getFullYear() === new Date(y.threadDate).getFullYear() &&
              new Date(x.threadDate).getMonth() === new Date(y.threadDate).getMonth() &&
              new Date(x.threadDate).getDate() === new Date(y.threadDate).getDate()) {
              return x.threadTime - y.threadTime;
            } else {
              return x.threadDate - y.threadDate;
            }
          })
      });
      console.log(this.ALLthreadList);
      
    });
  }

  /**
   * Saves the thread answer to the database.
   */
  saveThreadAnswer() {
    addDoc(this.dbAnswer, this.ThreadAnswer.toJSON());
  }

  /**
   * Constructs a thread object with specified properties, using provided values or defaults.
   * @param obj The object containing properties to include in the thread object.
   * @param id The ID of the thread.
   * @returns A thread object with specified properties.
   */
  setThreadObject(obj: any) {
    return {
      id: obj.id || "",
      threadAreaInput: obj.threadAreaInput || "",
      loginName: obj.loginName || "",
      threadTime: obj.threadTime || "",
      threadDate: obj.threadDate || ""
    }
  }

  /**
   * Retrieves a reference to the 'thread' collection in Firestore.
   * @returns A reference to the 'thread' collection in Firestore.
   */
  getThreadAnswerRef() {
    return collection(this.firestore, 'thread');
  }

  /**
   * Adds a thread to the 'thread' collection in Firestore.
   */
  addThread() {
    addDoc(collection(this.firestore, 'thread'), this.ThreadAnswer.toJSON());
  }

  /**
   * Retrieves the list of thread answers.
   * @returns An array containing the list of thread answers.
   */
  getAnswer() {
    return this.threadList;
  }



}
