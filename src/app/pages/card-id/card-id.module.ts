import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardIDPageRoutingModule } from './card-id-routing.module';

import { CardIDPage } from './card-id.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    CardIDPageRoutingModule,
  ],
  declarations: [CardIDPage]
})
export class CardIDPageModule {}


