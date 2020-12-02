import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './anonimo/acesso/login/login.component';
import { AnonimoRota } from './anonimo/anonimo.rota';
import { AutenticadoComponent } from './autenticado/autenticado.component';
import { AutenticadoRota } from './autenticado/autenticado.rota';
import { AuthGuard } from './core/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    children: AnonimoRota.Rotas
  },
  {
    path: '',
    component: AutenticadoComponent,
    children: AutenticadoRota.Rotas,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
