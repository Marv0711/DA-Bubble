import { Component } from '@angular/core';
import { LogoComponent } from "../../logo/logo.component";
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'app-board-header',
    standalone: true,
    templateUrl: './board-header.component.html',
    styleUrl: './board-header.component.scss',
    imports: [LogoComponent, MatIconModule]
})
export class BoardHeaderComponent {

}
