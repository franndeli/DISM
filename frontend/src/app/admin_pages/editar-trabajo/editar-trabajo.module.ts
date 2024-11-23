import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarTrabajoPageRoutingModule } from './editar-trabajo-routing.module';

import { EditarTrabajoPage } from './editar-trabajo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarTrabajoPageRoutingModule
  ],
  declarations: [EditarTrabajoPage]
})
export class EditarTrabajoPageModule {}
