import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloseEmojiService {

  isEmojiPickerVisible: boolean = false;

  constructor() { }

  closeEmojiField() {
    if (this.isEmojiPickerVisible) {
      this.isEmojiPickerVisible = false;
    }
  }
}
