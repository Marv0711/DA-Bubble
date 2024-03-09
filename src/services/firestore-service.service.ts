import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { User } from '../models/user.class';
import { Chat } from '../models/chat.class';
import { AuthenticationService } from './authentication.service';
import { Channel } from '../models/channel.class';
import { BehaviorSubject } from 'rxjs';
import { ThreadChat } from '../models/threadChat.class';


@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {

  firestore: Firestore = inject(Firestore);
  //thread
  ThreadAnswer = new ThreadChat();
  threadList:any = [];
  dbAnswer;
  unsubAnswer;
  //chat
  chat = new Chat();
  chatList: any = [];
  chatSwitch: number = 0;
  unsubChat;
  dbChat;
  //threadvaraibel
  loginName: string = "";
  threadChatText: string = '';
  threadChatloginName: string = '';
  threadChatTime: string = '';
  //login
  user = new User();
  currentUser!: any;
  userMail: string = "";
  userID: string = "";
  getUserID;
  getAllUser;
  allUserList:any = []
  donwloadUrl: string = "";
  //channel
  unsubchannel;
  channel = new Channel();
  channelList: any = [];
  channelID: string = 'C6ZgPK9OjzZxv2xjdqOz'
  channelName = '';
  channelUserAmount!: number;
  currentChat!: Chat;

  constructor() {
    this.unsubChat = this.subChatList(this.channelID);
    this.unsubchannel = this.subChannelList();
    this.getUserID = this.subUserID(this.userMail, this.donwloadUrl);
    this.getAllUser = this.subAllUser();
    this.dbChat = collection(this.firestore, 'chat');
    //thread
    this.unsubAnswer = this.subThreadList();
    this.dbAnswer = collection(this.firestore, 'thread');
  }

  getUserRef() {
    return collection(this.firestore, 'users');
  }

  getUser(docID: string) {
    return doc(collection(this.firestore, 'users'), docID);
  }

  addUser() {
    addDoc(collection(this.firestore, 'users'), this.user.toJSON());
  }

  async getUserJSON(docRef: DocumentReference) {
    const docSnap = await getDoc(docRef);
    let user = docSnap.data();
    this.currentUser = new User(user)
  }

  //chat
  getChatRef() {
    return collection(this.firestore, 'chat');
  }

  getChat(docID: string) {
    return doc(collection(this.firestore, 'users'), docID);
  }

  setChatObject(obj: any, id: string) {
    return {
      id: id || "",
      textAreaInput: obj.textAreaInput || "",
      chatTime: obj.chatTime || "",
      chatDate: obj.chatDate || "",
      loginName: obj.loginName || ""
    }
  }

  saveChat() {
    addDoc(this.dbChat, this.chat.toJSON());
  }

  addChannel() {
    addDoc(collection(this.firestore, 'channels'), this.channel.toJSON());
  }

  getChats() {
    return this.chatList;
  }

  ngOnDestroy() {
    this.subChatList(this.channelID);
    this.subChannelList();
    this.subUserID(this.userMail, this.donwloadUrl);
    this.subAllUser();
    this.subThreadList();
  }

  subAllUser() {
    return onSnapshot(this.getUserRef(), (list) => {
      this.allUserList = [];
      list.forEach(element => {
        this.allUserList.push(this.setUserListObject(element.data()));
      });
    });
  }

  setUserListObject(obj: any) {
    return {
      name: obj.name || "",
      mail: obj.mail || "",
      profileImg: obj.profileImg || "",
    }
  }

  subUserID(userMail: string, downloadUrl: string) {
    return onSnapshot(this.getUserRef(), (list) => {
      list.forEach(element => {
        if (element.data()['mail'] == userMail && this.userID === "") {
          this.userID = element.id;
          this.UpdateProfileImgPath(downloadUrl);
          return;
        }
      });
    });
  }

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

  setChannelObject(obj: any, id: string) {
    return {
      id: id || "",
      name: obj.name || "",
      users: obj.users || ""
    }
  }

  getChannelRef() {
    return collection(this.firestore, 'channels');
  }

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

  getChannelName(channelID: string) {
    this.channelName = channelID;
  }

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
  
  subThreadList() {
    return onSnapshot(this.getThreadAnswerRef(), (list) => {
      this.allUserList = [];
      list.forEach(element => {
        this.allUserList.push(this.setThreadObject(element.data(), element.id));
      });
    });
  }

  saveThreadAnswer() {
    addDoc(this.dbAnswer, this.ThreadAnswer.toJSON());
  }

  setThreadObject(obj: any, id: string) {
    return {
      id: id || "",
      threadAreaInput: obj. threadAreaInput || "",
      loginName: obj.loginName || ""
    }
  }

  getThreadAnswerRef() {
    return collection(this.firestore, 'thread');
  }

  getAnswer() {
    return this.threadList;
  }

  addThread() {
    addDoc(collection(this.firestore, 'thread'), this.ThreadAnswer.toJSON());
  }





}
