import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './login/create-account/create-account.component';
import { provideRouter } from '@angular/router';
import { MainBoardComponent } from './main-board/main-board.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'board', component: MainBoardComponent },
    { path: 'create-account', component: CreateAccountComponent }
];


