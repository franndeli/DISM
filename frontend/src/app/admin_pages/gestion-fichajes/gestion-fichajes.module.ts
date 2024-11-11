import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionFichajesPageRoutingModule } from './gestion-fichajes-routing.module';

import { GestionFichajesPage } from './gestion-fichajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionFichajesPageRoutingModule
  ],
  declarations: [GestionFichajesPage]
})
export class GestionFichajesPageModule {}
