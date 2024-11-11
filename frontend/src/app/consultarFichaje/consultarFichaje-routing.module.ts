import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { consultarFichaje } from './consultarFichaje.page';

const routes: Routes = [
  {
    path: '',
    component: consultarFichaje,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class consultarFichajeRoutingModule {}
