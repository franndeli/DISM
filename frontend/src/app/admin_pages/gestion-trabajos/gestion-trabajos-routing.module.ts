import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionTrabajosPage } from './gestion-trabajos.page';

const routes: Routes = [
  {
    path: '',
    component: GestionTrabajosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionTrabajosPageRoutingModule {}
