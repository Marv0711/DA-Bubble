import { Component, HostBinding } from '@angular/core';
import { slideFromRight } from './popup-msg-animaiton';
import { CommonModule } from '@angular/common';;
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-popup-msg',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './popup-msg.component.html',
  styleUrl: './popup-msg.component.scss',
  
})
export class PopupMsgComponent {





}
