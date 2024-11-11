import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { realizarFichaje } from './realizarFichaje.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { realizarFichajeRoutingModule } from './realizarFichaje-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    realizarFichajeRoutingModule
  ],
  declarations: [realizarFichaje]
})
export class realizarFichajeModule {}
