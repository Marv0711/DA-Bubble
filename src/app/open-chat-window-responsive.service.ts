import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenChatWindowResponsiveService {

  chatOpenAndWithUnder1300px: boolean = false;

  threadIsOpen: boolean = false

  directMessageOpenAndWithUnder1300px: boolean = false;

  newMessageOpenAndWithUnder1300px: boolean = false;

  newMessagesOpen: boolean = false;

  directMessagesOpen: boolean = false;

  threadOpenAndWithUnder1300px: boolean = false;
  
  constructor() { }
}
