import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenChatWindowResponsiveService {

  chatOpenAndWithUnder1300px: boolean = false;

  directMessageOpenAndWithUnder1300px: boolean = false;

  directMessagesOpen: boolean = false;
  
  constructor() { }
}
