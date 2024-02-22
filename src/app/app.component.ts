import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainBoardComponent } from "./main-board/main-board.component";
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, MainBoardComponent, LoginComponent, CommonModule]
})


export class AppComponent {
  title = 'da-bubble-project';

  public login: boolean = false

  constructor(){
    
  }
}
