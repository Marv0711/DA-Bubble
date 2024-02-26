import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {
  constructor() { }
  firestore: Firestore = inject(Firestore);
  
  user = new User();
  currentUser!: User;
  id:any;

  getUserRef() {
    return collection(this.firestore, 'users');
  }

  getUserInfo(userId: string, userInfoId: string) {
    const userDocRef = doc(this.firestore, 'users', 'ZlkYWHY6IH4D8PwKV6RN');
    const userInfoCollectionRef = collection(userDocRef, 'userInfo');
    return doc(userInfoCollectionRef, 'cPiTxwmZRRotM2lb5BXq');
  }

  getUser(colId: string, docID: string) {
    return doc(collection(this.firestore, colId), docID);
  }

   async getUserJSON(docRef:DocumentReference) {
   const docSnap = await getDoc(docRef);
      let user = docSnap.data();
      this.currentUser = new User(user)
      console.log(this.currentUser);
  }

}
