import { Component } from '@angular/core';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { ActivatedRoute } from '@angular/router';
import { MessageFieldComponent } from "../message-field/message-field.component";


@Component({
    selector: 'app-thread-window',
    standalone: true,
    templateUrl: './thread-window.component.html',
    styleUrl: './thread-window.component.scss',
    imports: [MessageFieldComponent]
})
export class ThreadWindowComponent {


  constructor( public chatService: FirestoreServiceService, private route: ActivatedRoute) {
  
  }

  closeThread() {
    document.getElementById('threat')?.classList.add('d-none');
  }

  
  dontclose(event: Event) {
    event.stopPropagation();
}

}
