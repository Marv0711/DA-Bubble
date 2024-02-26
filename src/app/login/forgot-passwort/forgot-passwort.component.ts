import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-forgot-passwort',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardContent, HeaderComponent, FooterComponent, MatIcon, CommonModule, RouterLink],
  templateUrl: './forgot-passwort.component.html',
  styleUrl: './forgot-passwort.component.scss'
})
export class ForgotPasswortComponent {
  isDisabled = false
}
