import { Component } from '@angular/core';


@Component({
    selector: 'app-thread-window',
    standalone: true,
    templateUrl: './thread-window.component.html',
    styleUrl: './thread-window.component.scss',
    imports: []
})
export class ThreadWindowComponent {

  closeThread() {
    document.getElementById('threat')?.classList.add('d-none');
  }

}
