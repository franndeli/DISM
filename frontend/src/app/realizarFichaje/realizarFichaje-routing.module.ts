import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { realizarFichaje } from './realizarFichaje.page';

const routes: Routes = [
  {
    path: '',
    component: realizarFichaje,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class realizarFichajeRoutingModule {}
