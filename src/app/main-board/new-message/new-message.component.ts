import { Component } from '@angular/core';
import { MessageFieldComponent } from '../message-field/message-field.component';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [MessageFieldComponent, ],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.scss'
})
export class NewMessageComponent {

  dontclose(event: Event) {
    event.stopPropagation();
};
}
