import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, doc, getDoc, getDocs, onSnapshot } from '@angular/fire/firestore';
import { User } from '../models/user.class';
import { Chat } from '../models/chat.class';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {

  firestore: Firestore = inject(Firestore);
  //chat
  chat = new Chat();
  chatList: any = [];
  chatSwitch:number = 0;
  unsubChat;
  dbChat;
  loginName: string = "";
  //login
  user = new User();
  currentUser!: any;
  //channel
  unsubchannel;
  channelList: any = [];
  channelID:string = 'C6ZgPK9OjzZxv2xjdqOz'
  id: any;
  channelName = '';

  constructor() {
    this.unsubChat = this.subChatList(this.channelID);
    this.unsubchannel = this.subChannelList();
    this.dbChat = collection(this.firestore, 'chat');
  }

  getUserRef() {
    getDocs(collection(this.firestore, 'users'));
  }

  getUser(docID: string) {
    return doc(collection(this.firestore, 'users'), docID);
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

  getChats() {
    return this.chatList;
}

  ngOnDestroy() {
    this.subChatList(this.channelID);
    this.subChannelList();
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
        if(element.data()['users'].includes(this.currentUser.email))
        this.channelList.push(this.setChannelObject(element.data(), element.id));
      });
      console.log("Die channelliste", this.channelList);
    })
  };

  getChannelName(channelID:string){
    this.channelName = channelID;
  }
}
