import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { HttpClientModule } from '@angular/common/http';
// import { ChartsModule } from 'ng2-charts';
import { PipesModule } from './pipes/pipes.module';
import { ComponentsModule } from './components/components.module';




@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    // NgChartsModule,
    // NgChartsModule.forRoot({ defaults: { ... } }),
    PipesModule,
    HttpClientModule,
    // NgxQRCodeModule,
    // LottieModule.forRoot({player: playerFactory}),
   ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
