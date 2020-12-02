import { Routes } from '@angular/router';
import { LoginComponent } from './acesso/login/login.component';

export class AnonimoRota {
    static Rotas: Routes = [
        {
            path: 'entrar',
            component: LoginComponent
        }, {
            path: '',
            component: LoginComponent
        }];
}