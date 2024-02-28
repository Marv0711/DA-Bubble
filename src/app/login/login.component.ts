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
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FirestoreServiceService } from '../../services/firestore-service.service';





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
  constructor(public firestoreService: FirestoreServiceService, private router: Router){}
  hide = true;
  inputPassword!: string;
  inputMail!: string;



  async onSubmit(form: NgForm) {
    if (form.valid) {
      // Formular ist gültig, hier kannst du die Übermittlung der Daten implementieren
      await this.firestoreService.checkRightUser(this.inputPassword, this.inputMail);
      if(this.firestoreService.loginComplete){
        this.router.navigateByUrl('/board')
      }
      console.log('Formular übermittelt!', form.value);
    } else {
      // Formular ist ungültig, hier kannst du entsprechend reagieren (z.B. Fehlermeldungen anzeigen)
      console.error('Formular ist ungültig!');
    }
  }

}
