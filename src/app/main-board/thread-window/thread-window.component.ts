import { Component, Input } from '@angular/core';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThreadMessageFieldComponent } from '../thread-message-field/thread-message-field.component';



@Component({
  selector: 'app-thread-window',
  standalone: true,
  templateUrl: './thread-window.component.html',
  styleUrl: './thread-window.component.scss',
  imports: [CommonModule, ThreadMessageFieldComponent]
})
export class ThreadWindowComponent {

  constructor(public chatService: FirestoreServiceService) {
  }

  closeThread() {
    document.getElementById('threat')?.classList.add('d-none');
  }


  dontclose(event: Event) {
    event.stopPropagation();
  }






}

