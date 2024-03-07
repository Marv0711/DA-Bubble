import { Component, Input } from '@angular/core';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { ActivatedRoute } from '@angular/router';
import { MessageFieldComponent } from "../message-field/message-field.component";
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-thread-window',
  standalone: true,
  templateUrl: './thread-window.component.html',
  styleUrl: './thread-window.component.scss',
  imports: [MessageFieldComponent, CommonModule]
})
export class ThreadWindowComponent {

 
  


  constructor(public chatService: FirestoreServiceService) {
   

  }

  showQuestion() {
    
  }




  closeThread() {
    document.getElementById('threat')?.classList.add('d-none');
  }


  dontclose(event: Event) {
    event.stopPropagation();
  }

 
  



}

