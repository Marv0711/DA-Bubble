import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupMsgService } from '../popup-msg/popup-msg.service';
import { PopupMsgComponent } from '../popup-msg/popup-msg.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LogoComponent } from '../../logo/logo.component';
@Component({
  selector: 'app-forgot-passwort',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardContent, HeaderComponent, FooterComponent, MatIcon, CommonModule, RouterLink, FormsModule, ReactiveFormsModule,
    PopupMsgComponent, LogoComponent],
  templateUrl: './forgot-passwort.component.html',
  styleUrl: './forgot-passwort.component.scss',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        right: 300,
        opacity: 1,
      })),
      state('closed', style({
        right: 0,
        opacity: 0.0,
      })),
      transition('open => closed', [
        animate('0.1s')
      ]),
      transition('closed => open', [
        animate('0.3s')
      ]),
    ]),
  ],
})

export class ForgotPasswortComponent {
  inputMail: string = ""
  success!: boolean
  isOpen: boolean
  emailSend!: boolean
  x: number
  disabled: boolean

  constructor(public authService: AuthenticationService, private msgService: PopupMsgService) {
    this.isOpen = false
    this.x = 1000
    this.disabled = false
  }

  /**
   * Send es reset Email Mail to the user and shows a popup message
   * @param email the email of the user
   */
  async sendEmail(email: string) {

    if (await this.authService.resetPassword(email)) {
      this.openPopup('E-Mail gesendet !')
    } else {
      this.openPopup('E-Mail wurde nicht gesendet! Überprüfe deine E-mail Adresse.')
    }
    this.blockSpamUsing()
  }

  /**
   * shows a popup message 
   * @param text the text you want to show in the popup message
   */
  openPopup(text: string) {
    this.isOpen = true;
    this.msgService.setPopupMsgText(text)
    // Starten des Timers nur wenn isOpen auf true gesetzt wird
    setTimeout(() => {
      this.isOpen = false;
    }, 3000);
  }

  /**
   * blocks the send button for 1 sec. Doubbles the time, everytime you press the button
   */
  blockSpamUsing() {
    this.x *= 2
    this.disabled = true
    setTimeout(() => {
      this.disabled = false
    }, this.x);
  }

}
