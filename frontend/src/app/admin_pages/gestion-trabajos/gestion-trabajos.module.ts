import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionTrabajosPageRoutingModule } from './gestion-trabajos-routing.module';

import { GestionTrabajosPage } from './gestion-trabajos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionTrabajosPageRoutingModule
  ],
  declarations: [GestionTrabajosPage]
})
export class GestionTrabajosPageModule {}
