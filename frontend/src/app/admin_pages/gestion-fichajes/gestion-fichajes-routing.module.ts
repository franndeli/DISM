import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionFichajesPage } from './gestion-fichajes.page';

const routes: Routes = [
  {
    path: '',
    component: GestionFichajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionFichajesPageRoutingModule {}
