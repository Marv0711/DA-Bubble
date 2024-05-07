import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Form, FormsModule } from '@angular/forms';
import { StorageService } from '../../../services/storage.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { confirmPasswordReset, verifyPasswordResetCode } from '@angular/fire/auth';
import { LogoComponent } from '../../logo/logo.component';
@Component({
  selector: 'app-reset-passwort',
  standalone: true,
  imports: [LogoComponent, MatCard, MatCardHeader, MatCardContent, HeaderComponent, FooterComponent, MatIcon, CommonModule, RouterLink, FormsModule],
  templateUrl: './reset-passwort.component.html',
  styleUrl: './reset-passwort.component.scss'
})
export class ResetPasswortComponent {
  isDisabled = false

  password!: string
  passwordRepeat!: string

  onSubmit(myform: Form) {
    let form = myform
    this.resetPassword()
  }


  newPassword: string = '';
  confirmPassword: string = '';
  code: string = '';
  email: string = '';

  constructor(
    public storageService: StorageService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.code = params['oobCode'];
      this.email = params['email'];
    });
  }


  async resetPassword() {
    try {
      if (await this.verifyCode()) {
        await confirmPasswordReset(this.authService.auth, this.code, this.newPassword);
        await this.router.navigate(['/singup']);
      }
    } catch (error) {
    }
  }

/**
 * is oob code in the url correct? 
 * @returns true
 */
  async verifyCode() {
    try {
      await verifyPasswordResetCode(this.authService.auth, this.code)
      return true
    } catch (error) {
      return false
    }


  }



}
