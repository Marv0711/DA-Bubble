import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupMsgService } from './popup-msg.service';

@Component({
  selector: 'app-popup-msg',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './popup-msg.component.html',
  styleUrl: './popup-msg.component.scss',

})
export class PopupMsgComponent {

  constructor(public msgService: PopupMsgService) {

  }


}
