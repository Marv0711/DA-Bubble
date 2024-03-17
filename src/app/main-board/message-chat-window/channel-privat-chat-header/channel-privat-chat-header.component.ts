import { Component } from '@angular/core';
import { FirestoreServiceService } from '../../../../services/firestore-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-channel-privat-chat-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './channel-privat-chat-header.component.html',
  styleUrl: './channel-privat-chat-header.component.scss'
})
export class ChannelPrivatChatHeaderComponent {
  constructor(public chatService: FirestoreServiceService){}
}
