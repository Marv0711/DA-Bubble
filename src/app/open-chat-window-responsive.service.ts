import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenChatWindowResponsiveService {

  chatOpenAndWithUnder1200px: boolean = false;
  
  constructor() { }
}
