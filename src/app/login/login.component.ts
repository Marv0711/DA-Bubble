import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LogoComponent } from '../logo/logo.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';





@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, LogoComponent, MatProgressBarModule, MatFormFieldModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatIconModule, FormsModule,
    ReactiveFormsModule, CommonModule, RouterLink, FooterComponent, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',

})


export class LoginComponent {
  hide = true;


  onSubmit(form: NgForm) {
    if (form.valid) {
      // Formular ist gültig, hier kannst du die Übermittlung der Daten implementieren
      console.log('Formular übermittelt!', form.value);
    } else {
      // Formular ist ungültig, hier kannst du entsprechend reagieren (z.B. Fehlermeldungen anzeigen)
      console.error('Formular ist ungültig!');
    }
  }

}
