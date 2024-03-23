import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from '@angular/fire/firestore';
import { ThreadChat } from '../models/threadChat.class';
import { FirestoreServiceService } from './firestore-service.service';
@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  constructor(private firstoreService: FirestoreServiceService) {
    // Subscribe to thread answer list
    this.unsubAnswer = this.subThreadList();
    this.unsubALLsubAnswer = this.subALLThreadList();
  }

  ThreadAnswer = new ThreadChat();
  // Array to store thread list data
  threadList: any = [];
  ALLthreadList: any = [];
  threadChatText: string = '';
  threadChatloginName: string = '';
  threadChatTime: string = '';
  threadUserMail: string = ''
  threadUserImg: string = ''
  currentChatID!: string;
  unsubAnswer;
  unsubALLsubAnswer;


  ngOnDestroy() {
    this.subThreadList();
    this.subALLThreadList();
  }
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
        }
      });
      this.threadList.sort((x: any, y: any) => {
        return x.threadTime - y.threadTime;
      });
    });
  }


  subALLThreadList() {
    return onSnapshot(this.getThreadAnswerRef(), (list) => {
      this.ALLthreadList = [];
      list.forEach(element => {
        this.ALLthreadList.push(this.setThreadObject(element.data()));
      });
      this.ALLthreadList.sort((x: any, y: any) => {
        return x.threadTime - y.threadTime;
      });
      console.log(this.ALLthreadList);
    });
  }


  /**
   * Saves the thread answer to the database.
   */
  saveThreadAnswer() {
    addDoc(this.firstoreService.dbAnswer, this.ThreadAnswer.toJSON());
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
      threadDate: obj.threadDate || "",
      // emoji: obj.emoji || "",
      profileImg: obj.profileImg || "kein img vorhanden",
      mail: obj.mail || 'email@nichtVorhanden.de'
    }
  }

  /**
   * Retrieves a reference to the 'thread' collection in Firestore.
   * @returns A reference to the 'thread' collection in Firestore.
   */
  getThreadAnswerRef() {
    return collection(this.firstoreService.firestore, 'thread');
  }

  /**
   * Adds a thread to the 'thread' collection in Firestore.
   */
  addThread() {
    addDoc(collection(this.firstoreService.firestore, 'thread'), this.ThreadAnswer.toJSON());
  }

  /**
   * Retrieves the list of thread answers.
   * @returns An array containing the list of thread answers.
   */
  getAnswer() {
    return this.threadList;
  }

  /**
 * Sets the current chat ID and subscribes to the thread list for the current chat.
 * @param chatID The ID of the chat to set as the current chat.
 */
  setCurrentChat(chatID: string) {
    this.currentChatID = chatID;
    this.subThreadList();
  }


}
