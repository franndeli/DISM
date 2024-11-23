import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearTrabajoPage } from './crear-trabajo.page';

const routes: Routes = [
  {
    path: '',
    component: CrearTrabajoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearTrabajoPageRoutingModule {}
