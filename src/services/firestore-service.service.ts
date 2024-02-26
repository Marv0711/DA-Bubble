import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, collection, doc, getDoc, getDocs } from '@angular/fire/firestore';
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
    getDocs(collection(this.firestore, 'users'));
  }

  getUser(docID: string) {
    return doc(collection(this.firestore, 'users'), docID);
  }

   async getUserJSON(docRef:DocumentReference) {
   const docSnap = await getDoc(docRef);
      let user = docSnap.data();
      this.currentUser = new User(user)
      console.log(this.currentUser);
  }

}
