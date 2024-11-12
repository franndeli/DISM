import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../authGuard/auth.guard';
import { UsuariosPage } from './usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosPage,
    canActivate: [AuthGuard],
    data: {rol: 'Usuario', redirect: 'admin'},
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('../inicio/inicio.module').then(m => m.InicioModule)
      },
      {
        path: 'realizarFichaje',
        loadChildren: () => import('../realizarFichaje/realizarFichaje.module').then(m => m.realizarFichajeModule)
      },
      {
        path: 'consultarFichaje',
        loadChildren: () => import('../consultarFichaje/consultarFichaje.module').then(m => m.consultarFichajeModule)
      },
      {
        path: '',
        redirectTo: '/usuarios/inicio',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosPageRoutingModule {}
