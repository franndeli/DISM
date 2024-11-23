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
        path: 'crear-usuario',
        loadChildren: () => import('../crear-usuario/crear-usuario.module').then(m => m.CrearUsuarioPageModule)
      },
      {
        path: 'editar-usuario/:id',
        loadChildren: () => import('../editar-usuario/editar-usuario.module').then( m => m.EditarUsuarioPageModule)
      },
      {
        path: 'editar-trabajo/:id',
        loadChildren: () => import('../editar-trabajo/editar-trabajo.module').then( m => m.EditarTrabajoPageModule)
      },
      {
        path: 'crear-trabajo',
        loadChildren: () => import('../crear-trabajo/crear-trabajo.module').then( m => m.CrearTrabajoPageModule)
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
