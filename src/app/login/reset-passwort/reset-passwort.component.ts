import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Form, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-passwort',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardContent, HeaderComponent, FooterComponent, MatIcon, CommonModule, RouterLink, FormsModule],
  templateUrl: './reset-passwort.component.html',
  styleUrl: './reset-passwort.component.scss'
})
export class ResetPasswortComponent {
  isDisabled = false

  password!: string
  passwordRepeat!: string


  onSubmit(myform: Form) {
    let form = myform
  }
}
