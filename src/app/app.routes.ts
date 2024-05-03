import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './login/create-account/create-account.component';
import { provideRouter } from '@angular/router';
import { MainBoardComponent } from './main-board/main-board.component';
import { CreateAvatarComponent } from './login/create-avatar/create-avatar.component';
import { ResetPasswortComponent } from './login/reset-passwort/reset-passwort.component';
import { ForgotPasswortComponent } from './login/forgot-passwort/forgot-passwort.component';
import { ImprintComponent } from './login/imprint/imprint.component';
import { DataProtectionComponent } from './login/data-protection/data-protection.component';

export const routes: Routes = [
    { path: '', redirectTo: '/singup', pathMatch: 'full' },
    { path: 'createaccount/avatar', component: CreateAvatarComponent },
    { path: 'singup', component: LoginComponent },
    { path: 'board', component: MainBoardComponent },
    { path: 'createaccount', component: CreateAccountComponent },
    { path: 'resetpassword', component: ResetPasswortComponent },
    { path: 'forgotpassword', component: ForgotPasswortComponent },
    { path: 'impress', component: ImprintComponent },
    { path: 'dataprotection', component: DataProtectionComponent },
];




