import { Injectable } from '@angular/core';
import { Chat } from '../models/chat.class';
import { privatChat } from '../models/privatChat.class';
import { addDoc, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { FirestoreServiceService } from './firestore-service.service';
import { ChannelService } from './channel.service';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestoreService: FirestoreServiceService
    , private channelService: ChannelService) {
    // Subscribe to private chat list
    this.unsubPrivateChat = this.subPrivateChatList();
    // Subscribe to chat list for the current channel
    this.unsubChat = this.subChatList(this.channelService.channelID);
  }


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
  currentContactUser!: any
  currentChat!: Chat;
  chatMail: string = '';


  ngOnDestroy() {
    this.subChatList(this.channelService.channelID);
    this.subPrivateChatList();
  }


  /**
   * Retrieves a reference to the 'chat' collection in Firestore.
   * @returns A reference to the 'chat' collection.
   */
  getChatRef() {
    return collection(this.firestoreService.firestore, 'chat');
  }

  /**
   * Retrieves a specific chat document from Firestore based on the provided document ID.
   * @param docID The ID of the chat document to retrieve.
   * @returns A reference to the specified chat document.
   */
  getChat(docID: string) {
    return doc(collection(this.firestoreService.firestore, 'chat'), docID);
  }

  getThread(docID: string) {
    return doc(collection(this.firestoreService.firestore, 'thread'), docID);
  }

  /**
 * Retrieves a specific chat document from Firestore based on the provided document ID.
 * @param docID The ID of the chat document to retrieve.
 * @returns A reference to the specified chat document.
 */
  getPrivatChat(docID: string) {
    return doc(collection(this.firestoreService.firestore, 'privateChat'), docID);
  }

  /**
   * Retrieves a reference to the 'privateChat' collection in Firestore.
   * @returns A reference to the 'privateChat' collection.
   */
  getPrivateChatRef() {
    return collection(this.firestoreService.firestore, 'privateChat');
  }

  /**
   * Retrieves a specific private chat document from Firestore based on the provided document ID.
   * @param docID The ID of the private chat document to retrieve.
   * @returns A reference to the specified private chat document.
   */
  getPrivateChat(docID: string) {
    return doc(collection(this.firestoreService.firestore, 'privateChat'), docID);
  }

  /**
 * Saves a chat to the Firestore database.
 */
  saveChat() {
    addDoc(this.firestoreService.dbChat, this.chat.toJSON());
  }

  /**
   * Saves a private chat to the Firestore database.
   */
  savePrivateChat() {
    addDoc(collection(this.firestoreService.firestore, 'privateChat'), this.privatChat.toJSON());
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
   * Retrieves the list of chats.
   * @returns The list of chats.
   */
  getChats() {
    return this.chatList;
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
            this.chatList.push(this.setPrivateChatObject(element.data(), element.id));
            this.chatList = this.chatList.sort(function (x: any, y: any) {
              return x.chatTime - y.chatTime
            })
          }
        });
      }
    })
  }

  /**
   * Subscribes to changes in the chat list for a specified channel.
   * @param docID The ID of the channel to subscribe to for chat updates.
   * @returns A function to unsubscribe from the snapshot listener.
   */
  subChatList(docID: any) {
    this.channelService.channelID = docID;
    return onSnapshot(this.getChatRef(), (list) => {
      this.chatList = [];
      list.forEach(element => {
        if (element.data()['id'] == docID) {
          this.chatList.push(this.setChatObject(element.data(), element.id));
        }
      });
      this.chatList = this.firestoreService.sortArray(this.chatList)
    })
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
      Time: obj.Time || "",
      Date: obj.Date || "",
      loginName: obj.loginName || "",
      emoji: obj.emoji || "",
      profileImg: obj.profileImg || "kein img vorhanden",
      mail: obj.mail || 'email@nichtVorhanden.de',
      chatImage: obj.chatImage || 'noImage'
    }
  }

  /**
   * Constructs a private chat object with specified properties, using provided values or defaults.
   * @param obj The object containing properties to include in the private chat object.
   * @returns A private chat object with specified properties.
   */
  setPrivateChatObject(obj: any, elementID: any) {
    return {
      id: elementID || "",
      member: obj.member || "",
      textAreaInput: obj.textAreaInput || "",
      chatTime: obj.chatTime || "",
      loginName: obj.loginName || "",
      emoji: obj.emoji || "",
      profileImg: obj.profileImg || "",
      email: obj.email || 'email@nichtVorhanden.de',
      chatImage: obj.chatImage || 'noImage'
    }
  }

  editChat(chat:any ){
    console.log(chat);
    
  }


















}





