import { Injectable } from '@angular/core';
import { FirestoreServiceService } from './firestore-service.service';
import { ChatService } from './chat.service';
import { getDoc, updateDoc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class EmojiService {

  isEmojisPickerVisible: boolean = false;
  isEmojiPickerVisible: boolean = false;
  isEmojiPickerVisibleReaction: boolean = false;

  constructor(private firestoreService: FirestoreServiceService, private chatService: ChatService) { }

  closeEmojiField() {
    if (this.isEmojiPickerVisible) {
      this.isEmojiPickerVisible = false;
    }
  }

  closeEmojisField() {
    if (this.isEmojisPickerVisible) {
      this.isEmojisPickerVisible = false;
    }
  }



  /**
  * Adds an emoji reaction to a chat message.
  * @param emoji The emoji to add as a reaction.
  * @param chatID The ID of the chat message to add the emoji reaction to.
  */
  async addEmojiInChat(emoji: any, chatID: string, channelType: string) {
    let chatDoc = this.chatService.getchatDoc(channelType, chatID);
    let chatDocSnapshot = await getDoc(chatDoc);
    let chatData = chatDocSnapshot.data()?.['emoji'] || [];

    const existingEmojiIndex = chatData.findIndex((item: any) => item.type === emoji);
    debugger
    if (existingEmojiIndex !== -1) {
        //if emoji already exists, just the amount of this emoji increases
        chatData[existingEmojiIndex].amount++;
        chatData[existingEmojiIndex].likerMail.push(this.firestoreService.currentUser.email);
    } else {
    chatData.push({
      amount: 1,
      type: emoji,
      likerMail: [this.firestoreService.currentUser.email]
    })
  }
    await updateDoc(chatDoc, {
      emoji: chatData
    })
  }

  /**
   * Updates the amount of an emoji reaction in a chat message.
   * @param chatID The ID of the chat message.
   * @param value The value by which to increase or decrease the emoji reaction amount.
   * @param i The index of the emoji reaction in the chat data array.
   */
  async UpdateEmojiAmount(chatID: string, value: number, i: number, channelType:string) {
    let chatDoc = this.chatService.getchatDoc(channelType, chatID);
    let chatDocSnapshot = await getDoc(chatDoc);
    let chatData = chatDocSnapshot.data()?.['emoji'] || [];
    let newValue = chatData[i]['amount'] + value;
    chatData[i]['amount'] = newValue;

    if (newValue == 0) {
      chatData.splice(i, 1);
      await updateDoc(chatDoc, {
        emoji: chatData
      })
    }
    else {
      if (value === 1) {
        chatData[i]['likerMail'].push(this.firestoreService.currentUser.email);
        await updateDoc(chatDoc, {
          emoji: chatData
        })
      }
      else {
        let index: number = chatData[i]['likerMail'].indexOf(this.firestoreService.currentUser.email);
        if (index != -1) {
          chatData[i]['likerMail'].splice(index, 1);
          await updateDoc(chatDoc, {
            emoji: chatData
          });
        }
      }
    }
  }

  /**
 * Updates the amount of an emoji reaction in a chat message.
 * @param chatID The ID of the chat message.
 * @param value The value by which to increase or decrease the emoji reaction amount.
 * @param i The index of the emoji reaction in the chat data array.
 */
  async UpdatePrivatEmojiAmount(chatID: string, value: number, i: number) {
    let chatDoc = this.chatService.getPrivatChat(chatID);
    let chatDocSnapshot = await getDoc(chatDoc);
    let chatData = chatDocSnapshot.data()?.['emoji'] || [];
    let newValue = chatData[i]['amount'] + value;
    chatData[i]['amount'] = newValue;

    if (newValue == 0) {
      chatData.splice(i, 1);
      await updateDoc(chatDoc, {
        emoji: chatData
      })
    }
    else {
      if (value === 1) {
        chatData[i]['likerMail'].push(this.firestoreService.currentUser.email);
        await updateDoc(chatDoc, {
          emoji: chatData
        })
      }
      else {
        let index: number = chatData[i]['likerMail'].indexOf(this.firestoreService.currentUser.email);
        if (index != -1) {
          chatData[i]['likerMail'].splice(index, 1);
          await updateDoc(chatDoc, {
            emoji: chatData
          });
        }
      }
    }
  }

  addThumpUp(chatID: string){
    this.addEmojiInChat("👍", chatID, 'chat')
  }

  addHacker(chatID: string){
    this.addEmojiInChat("👨‍💻", chatID, 'chat')
  }



}
