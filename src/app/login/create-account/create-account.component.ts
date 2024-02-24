import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LogoComponent } from '../../logo/logo.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ThemePalette} from '@angular/material/core';
import { HeaderComponent } from '../header/header.component';

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
    ReactiveFormsModule, CommonModule, RouterLink, FooterComponent,MatCheckboxModule,HeaderComponent ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };

  
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
