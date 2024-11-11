import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Inicio } from './inicio.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { InicioRoutingModule } from './inicio-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    InicioRoutingModule
  ],
  declarations: [Inicio]
})
export class InicioModule {}
