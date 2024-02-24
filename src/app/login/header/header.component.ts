import { Component } from '@angular/core';
import { LogoComponent } from '../../logo/logo.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public router: Router) {

  }
}
