import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/authGuard/auth.guard';
import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    canActivate: [AuthGuard],
    data: {rol: 'Administrador', redirect: 'usuarios'},
    children: [
      {
        path: 'inicio-admin',
        loadChildren: () => import('../inicio-admin/inicio-admin.module').then(m => m.InicioAdminPageModule)
      },
      {
        path: 'gestion-fichajes',
        loadChildren: () => import('../gestion-fichajes/gestion-fichajes.module').then(m => m.GestionFichajesPageModule)
      },
      {
        path: 'gestion-trabajos',
        loadChildren: () => import('../gestion-trabajos/gestion-trabajos.module').then(m => m.GestionTrabajosPageModule)
      },
      {
        path: 'gestion-usuarios',
        loadChildren: () => import('../gestion-usuarios/gestion-usuarios.module').then(m => m.GestionUsuariosPageModule)
      },
      {
        path: '',
        redirectTo: '/admin/inicio-admin',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
