import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { updateProfile, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FirestoreServiceService } from './firestore-service.service';
import { deleteUser } from '@angular/fire/auth';
import { updateEmail } from '@angular/fire/auth';
import { ChatService } from './chat.service';
import { updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {

  constructor(private authService: AuthenticationService,
    private router: Router,
    private fireService: FirestoreServiceService,
    private chatService: ChatService
  ) { }


  inputPassword!: string;
  inputMail!: string;
  username!: string;

  /**
   * creats a account with email and password
   * @param email email of user as string
   * @param name  name of user as string
   * @param password  pw of user as string
   */
  async createAccount(email: string, name: string, password: string) {
    const loginEmail = email
    const loginPassword = password
    const loginUsername = name

    try {
      const userCredentail = await createUserWithEmailAndPassword(this.authService.auth, loginEmail, loginPassword)
    } catch (err: any) {

    }
  }


  /**
  * 
  * @param user needs a userCredentail.currentUser /the user you want to change / the logged in user
  * @param username the new username
  * @param imgUrl the new image url
  */
  async updateUser(user: any, username: string, imgUrl: string,) {
    await this.updateUsername(user, username)
    await this.updatePhotoUrl(user, imgUrl)

  }


  /**
   * Changes the username
   * @param user needs a userCredentail.currentUser /the user you want to change / the logged in user
   * @param username the new username
   */
  async updateUsername(user: any, username: string) {
    await updateProfile(user, {
      displayName: username
    }).then(() => {
    })
  }


  /**
   * changs photoUrl
   * @param user needs a userCredentail.currentUser /the user you want to change / the logged in user
   * @param url the new image url
   */
  async updatePhotoUrl(user: any, url: string) {
    await updateProfile(user, {
      photoURL: url
    })
  }


  /**
   * 
   * @param user needs a userCredentail.currentUser /the user you want to change / the logged in user
   * @param email the new Email
   */
  async updateEmailAdress(user: any, email: string) {
    await updateEmail(user, email)
  }


  /**
 * delete user
 */
  deleteUser() {
    deleteUser(this.authService.auth.currentUser!)
  }


  async updateProfileImgs(chatID: string, threadID: string, privateID: string) {
    let ref
    if (chatID.length > 0) {
      ref = this.chatService.getChat(chatID)
    }
    else if (threadID.length > 0) {
      ref = this.chatService.getThread(threadID)
    }
    else if (privateID.length > 0) {
      ref = this.chatService.getPrivatChat(privateID)
    }
    await updateDoc(ref!, {
      profileImg: this.authService.currentUser.photoURL
    })
  }


  /**
   * changes all profileImages in chat and thread
   * @param list the chatList array and allThreadList array
   * @param type 'chat', 'thread' or private
   */
  async changeAllProfileImgs(list: any[], type: string) {
    for (let i = 0; i < list.length; i++) {
      const chat = list[i];
      if (chat.mail == this.authService.currentUser.email) {
        try {
          if (type === 'chat' && !chat.member) { await this.updateProfileImgs(chat.id, '', '') }
          if (type === 'thread' && chat.elementID) { await this.updateProfileImgs('', chat.elementID, '') }
          if (type === 'private' && chat.member) {
            await this.updateProfileImgs('', '', chat.id)
          }
        } catch (error) {
        }
      }
    }
  }


  async updateChatUserName(chatID: string, threadID: string, privateID: string) {
    let ref
    if (chatID.length > 0) {
      ref = this.chatService.getChat(chatID)
    }
    else if (threadID.length > 0) {
      ref = this.chatService.getThread(threadID)
    }
    else if (privateID.length > 0) {
      ref = this.chatService.getPrivatChat(privateID)
    }
    await updateDoc(ref!, {
      name: this.authService.auth.currentUser?.displayName,
      loginName: this.authService.auth.currentUser?.displayName
    })
  }


  async changeAllUserNames(list: any[], type: string) {
    for (let i = 0; i < list.length; i++) {
      const chat = list[i];
      if (chat.mail == this.authService.currentUser.email) {
        try {
          if (type === 'chat' && !chat.member) { await this.updateChatUserName(chat.id, '', '') }
          if (type === 'thread' && chat.elementID) { await this.updateChatUserName('', chat.elementID, '') }
          if (type === 'private' && chat.member) {
            await this.updateChatUserName('', '', chat.id)
          }
        } catch (error) {
        }
      }
    }
  }




}




