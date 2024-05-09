import { Injectable } from '@angular/core';
import { Chat } from '../models/chat.class';
import { privatChat } from '../models/privatChat.class';
import { CollectionReference, DocumentReference, addDoc, collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { FirestoreServiceService } from './firestore-service.service';
import { ChannelService } from './channel.service';
import { AuthenticationService } from './authentication.service';
import { ThreadService } from './thread.service';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private firestoreService: FirestoreServiceService,
    private channelService: ChannelService,
    private authService: AuthenticationService,
    private threadService: ThreadService
  ) {

    this.unsubPrivateChat = this.subPrivateChatList();
    this.unsubChat = this.subChatList(this.channelService.channelID);
    this.unsubMyChat = this.subMyChatList();
  }


  //chat
  // Initialize Chat object for general chats
  chat = new Chat();
  // Initialize PrivateChat object for private chats
  privatChat = new privatChat();
  privateChatImage: string = ''

  chatList: any = [];
  privateChatList: any = [];
  // Variable to control chat switching
  chatSwitch: number = 0;
  // Subscription for general chat updates
  unsubChat;
  // Subscription for private chat updates
  unsubPrivateChat;
  unsubMyChat;
  currentContactUser!: any
  currentChat!: Chat;
  chatMail: string = '';
  allChats: any[] = []

  emojiPickerIsOpen: boolean = false;
  openChat = Chat;

  ngOnDestroy() {
    this.unsubChat;
    this.unsubPrivateChat;
    this.unsubMyChat;
  }


  /**
   * Retrieves a reference to the 'chat' collection in Firestore.
   * @returns A reference to the 'chat' collection.
   */
  getChatRef() {
    return collection(this.firestoreService.firestore, 'chat');
  }

  /**
 * Retrieves a reference to the 'privateChat' collection in Firestore.
 * @returns A reference to the 'privateChat' collection.
 */
  getPrivateChatRef() {
    return collection(this.firestoreService.firestore, 'privateChat');
  }

  getThreadRef() {
    return collection(this.firestoreService.firestore, 'thread');
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
    let docRef = collection(this.firestoreService.firestore, 'privateChat');

    addDoc(docRef, this.privatChat.toJSON())
      .then((docRef) => {
        let docId = docRef.id;
        let docToUpdate = doc(this.firestoreService.firestore, 'privateChat', docId);
        let updateData = { id: docId };

        return updateDoc(docToUpdate, updateData);
      })
  }


  /**
   * Sets the current contact user and subscribes to the private chat list.
   * @param user The user to set as the current contact user.
   */
  getOtherUser(user: any) {
    this.currentContactUser = user;

    if (user.mail === this.authService.auth.currentUser?.email) {
      this.subMyChatList();
    }
    else {
      this.subPrivateChatList();
    }
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
      this.privateChatList = [];
      if (this.currentContactUser) {
        list.forEach(element => {
          if (element.data()['member'].includes(this.currentContactUser.mail) && element.data()['member'].includes(this.authService.auth.currentUser?.email)) {
            this.chatList.push(this.setPrivateChatObject(element.data(), element.id));
          }
        });
        this.chatList = this.firestoreService.sortArray(this.chatList)
      }
    })
  }

  subMyChatList() {
    return onSnapshot(this.getPrivateChatRef(), (list) => {
      this.chatList = [];
      this.privateChatList = [];
      if (this.currentContactUser) {
        list.forEach(element => {
          if (element.data()['mail'] == this.authService.auth.currentUser?.email && element.data()['member'].every((value: any) => value === this.authService.auth.currentUser?.email)) {
            this.chatList.push(this.setPrivateChatObject(element.data(), element.id));
          }
        });
        this.chatList = this.firestoreService.sortArray(this.chatList)
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
      channelID: obj.id || "",
      textAreaInput: obj.textAreaInput || "",
      channelName: obj.channelName || "",
      time: obj.time || "",
      date: obj.date || "",
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
  setPrivateChatObject(obj: any, id: string) {

    return {
      id: id || "",
      mail: obj.mail || 'email@nichtVorhanden.de',
      member: obj.member || "",
      textAreaInput: obj.textAreaInput || "",
      chatTime: obj.chatTime || "",
      loginName: obj.loginName || "",
      emoji: obj.emoji || "",
      profileImg: obj.profileImg || "",
      chatImage: obj.chatImage || 'noImage'
    }
  }

  getchatDoc(type: string, chatID: string) {
    switch (type) {
      case "chat":
        return this.getChat(chatID);
      case "privatChat":
        return this.getPrivatChat(chatID)
      case "thread":
        return this.getThread(chatID)
      default:
        throw new Error("Unknown channel type: " + type);
    }
  }

  async editChat(chatID: string, type: string, newText: string) {
    let chatDoc = this.getchatDoc(type, chatID);
    let chatDocSnapshot = await getDoc(chatDoc);
    let chatData;

    if (type == 'thread') {
      chatData = chatDocSnapshot.data()?.['threadAreaInput'] || '';
    }
    else {
      chatData = chatDocSnapshot.data()?.['textAreaInput'] || '';
    }

    chatData = newText;

    if (type == 'thread') {
      await updateDoc(chatDoc, {
        threadAreaInput: chatData
      })
    }
    else {
      await updateDoc(chatDoc, {
        textAreaInput: chatData
      })
    }
  }




  formatDate(chatDate: number): string {

    const chatDateObject = new Date(chatDate);

    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    const chatDay = chatDateObject.getDate();
    const chatMonth = chatDateObject.getMonth();
    const chatYear = chatDateObject.getFullYear();

    const daysOfWeek = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

    if (chatYear === todayYear && chatMonth === todayMonth && chatDay === todayDate) {
      return 'heute';
    } else {
      const dayOfWeek = daysOfWeek[chatDateObject.getDay()];
      const month = months[chatMonth];
      return `${dayOfWeek}, ${chatDay}. ${month}`;
    }
  }


  async updateChatArray(collection: CollectionReference, isPrivateChat: boolean, isThread: boolean) {
    const querySnapshot = await getDocs(collection);

    querySnapshot.forEach((doc) => {
      let chatObject;
      if (isThread) {
        chatObject = this.threadService.setThreadObject(doc.data(), doc.id);
      } else {
        chatObject = isPrivateChat ? this.setPrivateChatObject(doc.data(), doc.id) : this.setChatObject(doc.data(), doc.id);
      }
      const existingChatIndex = this.allChats.findIndex(chat => chat.id === doc.id);
      if (existingChatIndex === -1) {
        this.allChats.push(chatObject);
      } else {
        this.allChats[existingChatIndex] = chatObject;
      }

    });
  }

  // Aufrufe der Methode in getAllChats()
  async getAllChats() {
    this.allChats = [];
    let privateChats = this.getPrivateChatRef();
    let chats = this.getChatRef();
    let threads = this.getThreadRef();
    await this.updateChatArray(chats, false, false);
    await this.updateChatArray(threads, false, true);
    await this.updateChatArray(privateChats, true, false)
  }



















}





