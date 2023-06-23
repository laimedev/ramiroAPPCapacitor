import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CapacitacionesPageRoutingModule } from './capacitaciones-routing.module';

import { CapacitacionesPage } from './capacitaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CapacitacionesPageRoutingModule
  ],
  declarations: [CapacitacionesPage]
})
export class CapacitacionesPageModule {}
