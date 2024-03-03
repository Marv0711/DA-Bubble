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
import { UpdateUserService } from '../../../services/update-user.service';


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


  constructor(private updateUserService: UpdateUserService, public router: Router, public firestoreService: FirestoreServiceService, public authService: AuthenticationService) { }


  inputPassword!: string;
  inputMail!: string;
  username!: string;

  /**
   * create account Logic
   * @param form the form from the inputs in the HTML doc
   */
  async onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('submit')
      this.sendToUpdateUserService()
      this.router.navigate(['/create-account/avatar'])
    } else {
      // Formular ist ungültig, hier kannst du entsprechend reagieren (z.B. Fehlermeldungen anzeigen)
      console.error('Account nicht erstellt! Formulardaten Falsch');
    }
  }

  sendToUpdateUserService() {

    this.updateUserService.inputPassword = this.inputPassword
    this.updateUserService.inputMail = this.inputMail
    this.updateUserService.username = this.username
    console.log('data send to updateService')
  }


}

