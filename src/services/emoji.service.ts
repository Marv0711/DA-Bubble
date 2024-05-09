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
  deletedEmoji = null;

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
    let index = chatData.findIndex((item: any) => item.likerMail.includes(this.firestoreService.currentUser.email));
    this.deletedEmoji = null;
    if (index !== -1) {
      this.reduceAmountOfEmojis(chatData, index)
    }
    const existingEmojiIndex = chatData.findIndex((item: any) => item.type === emoji);
    if (this.deletedEmoji === null || emoji !== this.deletedEmoji['type']) {
      if (existingEmojiIndex !== -1) {
       this.increaseAmountofEmoji(chatData, existingEmojiIndex)
      } else {
        this.addNewEmoji(chatData, emoji)
      }}
      this.updateEmojisInFirebase(chatDoc, chatData);  
      this.chatService.emojiPickerIsOpen = false;
  }

  async updateEmojisInFirebase(chatDoc: any, chatData: any){
    await updateDoc(chatDoc, {
      emoji: chatData
    });
  }

  addNewEmoji(chatData: any, emoji:any){
    chatData.push({
      amount: 1,
      type: emoji,
      likerMail: [this.firestoreService.currentUser.email],
    })
  }

  increaseAmountofEmoji(chatData: any, existingEmojiIndex: any){
     //if emoji already exists, just the amount of this emoji increases
     chatData[existingEmojiIndex].amount++;
     chatData[existingEmojiIndex].likerMail.push(this.firestoreService.currentUser.email);
  }

  reduceAmountOfEmojis(chatData: any, index: any){
    chatData.forEach(async (item: any) => {
      if (item.likerMail.includes(this.firestoreService.currentUser.email)) {
        let mailIndex = item.likerMail.indexOf(this.firestoreService.currentUser.email)
        if (item.amount === 1) {
          chatData.splice(index, 1);
        } else {
          item.amount--;
          item.likerMail.splice(mailIndex, 1)
        }
        this.deletedEmoji = item;
      }
    });
  }



  /**
   * Updates the amount of an emoji reaction in a chat message.
   * @param chatID The ID of the chat message.
   * @param value The value by which to increase or decrease the emoji reaction amount.
   * @param i The index of the emoji reaction in the chat data array.
   */
  async UpdateEmojiAmount(chatID: string, value: number, i: number, channelType: string) {
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

  addThumpUp(chatID: string, type: string) {
    this.addEmojiInChat("👍", chatID, type)
  }

  addHacker(chatID: string, type: string) {
    this.addEmojiInChat("👨‍💻", chatID, type)
  }



}
