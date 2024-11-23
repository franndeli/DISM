import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearTrabajoPageRoutingModule } from './crear-trabajo-routing.module';

import { CrearTrabajoPage } from './crear-trabajo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearTrabajoPageRoutingModule
  ],
  declarations: [CrearTrabajoPage]
})
export class CrearTrabajoPageModule {}
