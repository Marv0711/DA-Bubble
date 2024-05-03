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
    { path: '', redirectTo: '/index.html', pathMatch: 'full' },
    { path: 'create-account/avatar', component: CreateAvatarComponent },
    { path: 'index.html', component: LoginComponent },
    { path: 'board', component: MainBoardComponent },
    { path: 'create-account', component: CreateAccountComponent },
    { path: 'reset-password', component: ResetPasswortComponent },
    { path: 'forgot-password', component: ForgotPasswortComponent },
    { path: 'imprint', component: ImprintComponent },
    { path: 'data-protection', component: DataProtectionComponent },
];




