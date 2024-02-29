import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, doc, getDoc, getDocs, onSnapshot } from '@angular/fire/firestore';
import { User } from '../models/user.class';
import { Chat } from '../models/chat.class';

@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {

  firestore: Firestore = inject(Firestore);
  //chat
  chat = new Chat();
  chatList: any = [];
  unsubChat;
  dbChat;
  loginName: string = "";
  //login
  user = new User();
  currentUser!: User;

  id: any;

  constructor() {
    this.unsubChat = this.subChatList();
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

  ngOnDestroy() {
    this.subChatList();
  }

  subChatList() {
    return onSnapshot(this.getChatRef(), (list) => {
      this.chatList = [];
      list.forEach(element => {
        this.chatList.push(this.setChatObject(element.data(), element.id));
        this.chatList = this.chatList.sort(function (x: any, y: any) {
          if (new Date(x.chatDate).getFullYear() === new Date(y.chatDate).getFullYear() && 
          new Date(x.chatDate).getMonth() === new Date(y.chatDate).getMonth() && 
          new Date(x.chatDate).getDate() === new Date(y.chatDate).getDate()) {
        // Wenn das Datum gleich ist, sortiere nach der Uhrzeit
        return x.chatTime - y.chatTime;
      } else {
        // Wenn das Datum unterschiedlich ist, sortiere nach dem Datum
        return x.chatDate - y.chatDate;
      }
        })
        console.log("Die Chatlist", this.chatList);
      });
    })
  };
}
