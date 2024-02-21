import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainBoardComponent } from "./main-board/main-board.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, MainBoardComponent]
})
export class AppComponent {
  title = 'da-bubble-project';
}
