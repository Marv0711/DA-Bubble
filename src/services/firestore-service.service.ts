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
  //login
  user = new User();
  currentUser!: User;
  loginComplete: boolean = false
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

  async checkRightUser(pw: string, mail: string) {
    let querySnapshot = await getDocs(collection(this.firestore, 'users'));

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data && data['password'] === pw && data['email'] === mail) {
        let docRef = this.getUser(doc.id);
        this.getUserJSON(docRef);
        this.loginComplete = true;
      }
    });
  }

  //chat
  getChatRef() {
    return collection(this.firestore, 'chat');
  }

  setChatObject(obj: any, id:string) {
    return {
      id: id || "",
      textAreaInput: obj. textAreaInput || "",
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
        console.log(this.chatList);
      });
    })
  };
}
