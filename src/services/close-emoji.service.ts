import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloseEmojiService {
  isEmojisPickerVisible: boolean = false;
  isEmojiPickerVisible: boolean = false;
  isEmojiPickerVisibleReaction: boolean = false;

  constructor() { }

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
}
