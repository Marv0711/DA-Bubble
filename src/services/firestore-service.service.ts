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
  loginComplete:boolean = false
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
  }

  async checkRightUser(pw:string, mail:string){
    let querySnapshot = await getDocs(collection(this.firestore, 'users'));
    
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data && data['password'] === pw && data['email'] === mail ) {
            let docRef = this.getUser(doc.id);
            this.getUserJSON(docRef);
            this.loginComplete = true;
        }
      });
}

}
