import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { consultarFichaje } from './consultarFichaje.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { consultarFichajeRoutingModule } from './consultarFichaje-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    consultarFichajeRoutingModule
  ],
  declarations: [consultarFichaje]
})
export class consultarFichajeModule {}
