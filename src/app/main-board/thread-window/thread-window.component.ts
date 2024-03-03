import { Component } from '@angular/core';
import { FirestoreServiceService } from '../../../services/firestore-service.service';


@Component({
    selector: 'app-thread-window',
    standalone: true,
    templateUrl: './thread-window.component.html',
    styleUrl: './thread-window.component.scss',
    imports: []
})
export class ThreadWindowComponent {


  constructor( public chatService: FirestoreServiceService) {}

  closeThread() {
    document.getElementById('threat')?.classList.add('d-none');
  }

}
