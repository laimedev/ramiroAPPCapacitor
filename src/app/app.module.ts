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
import { QRCodeModule } from 'angularx-qrcode';


import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';


import { PdfMakeWrapper } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);



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
    QRCodeModule,
    
    // NgxQRCodeModule,
    // LottieModule.forRoot({player: playerFactory}),
   ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, File, FileOpener],
  bootstrap: [AppComponent],
})
export class AppModule {}

