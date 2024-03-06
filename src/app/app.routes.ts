import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './login/create-account/create-account.component';
import { provideRouter } from '@angular/router';
import { MainBoardComponent } from './main-board/main-board.component';
import { CreateAvatarComponent } from './login/create-avatar/create-avatar.component';
import { ResetPasswortComponent } from './login/reset-passwort/reset-passwort.component';
import { ForgotPasswortComponent } from './login/forgot-passwort/forgot-passwort.component';
import { ThreadWindowComponent } from './main-board/thread-window/thread-window.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'create-account/avatar', component: CreateAvatarComponent },
    { path: 'login', component: LoginComponent },
    { path: 'board', component: MainBoardComponent },
    { path: 'create-account', component: CreateAccountComponent },
    { path: 'reset-password', component: ResetPasswortComponent },
    { path: 'forgot-password', component: ForgotPasswortComponent },
    { path: 'thread/:id', component: ThreadWindowComponent }
];


