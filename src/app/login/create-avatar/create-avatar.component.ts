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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ThemePalette } from '@angular/material/core';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-create-avatar',
  standalone: true,
  imports: [MatCardModule, LogoComponent, MatProgressBarModule, MatFormFieldModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatIconModule, FormsModule,
    ReactiveFormsModule, CommonModule, RouterLink, FooterComponent, MatCheckboxModule, HeaderComponent],
  templateUrl: './create-avatar.component.html',
  styleUrl: './create-avatar.component.scss'
})
export class CreateAvatarComponent {

  public avatarImages = [
    '../../../assets/img/avatars/male1.png',
    '../../../assets/img/avatars/male2.png',
    '../../../assets/img/avatars/female1.png',
    '../../../assets/img/avatars/male3.png',
    '../../../assets/img/avatars/male4.png',
    '../../../assets/img/avatars/female2.png',
  ]


  isDisabled: boolean = false
}
