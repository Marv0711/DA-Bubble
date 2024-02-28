import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LogoComponent } from '../../logo/logo.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule, NgForm, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ThemePalette } from '@angular/material/core';
import { HeaderComponent } from '../header/header.component';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { AuthenticationService } from '../../../services/authentication.service';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}



@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [MatCardModule, LogoComponent, MatProgressBarModule, MatFormFieldModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatIconModule, FormsModule,
    ReactiveFormsModule, CommonModule, RouterLink, FooterComponent, MatCheckboxModule, HeaderComponent,],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Primary', completed: false, color: 'primary' },
      { name: 'Accent', completed: false, color: 'accent' },
      { name: 'Warn', completed: false, color: 'warn' },
    ],
  };
  main: any;
  btn: any;


  isDisabled: boolean = false
  firestore: any
  inputPassword!: string;
  inputMail!: string;
  username!: string;

  constructor(public router: Router, public firestoreService: FirestoreServiceService, public authService: AuthenticationService) { }

  async onSubmit(form: NgForm) {
    if (form.valid) {

      await this.createAccount()
    
    } else {
      // Formular ist ungültig, hier kannst du entsprechend reagieren (z.B. Fehlermeldungen anzeigen)
      console.error('Account nicht erstellt! Formulardaten Falsch');
    }
  }


  async createAccount() {
    const loginEmail = this.inputMail
    const loginPassword = this.inputPassword

    try {
      const userCredentail = await createUserWithEmailAndPassword(this.authService.auth, loginEmail, loginPassword)
      await this.authService.updateUser(userCredentail.user, this.username, 'testurl')
      console.log('Account erstellt',userCredentail.user);
      await this.authService.signout()
      console.log('current user logged in:' ,this.authService.auth.currentUser)
      this.router.navigate(['/create-account/avatar'])
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential')
        console.log('create account failed')
      // showLoginError()
    }

  }
}

