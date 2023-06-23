import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { UnidadComponent } from './unidad/unidad.component';
import { RecursosComponent } from './recursos/recursos.component';
import { EncuestaComponent } from './encuesta/encuesta.component';


@NgModule({
  declarations: [
    UnidadComponent,
    RecursosComponent,
    EncuestaComponent
  ],
  exports: [
    UnidadComponent,
    RecursosComponent,
    EncuestaComponent


  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class ComponentsModule { }
