import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupMsgService {

  constructor() {
    this.popupMsgText = 'Gesendet!'
  }

  popupMsgText: string

  setPopupMsgText(text: string) {
    this.popupMsgText = text
  }
}
