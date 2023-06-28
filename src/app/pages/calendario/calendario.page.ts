import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
// import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController, Platform } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';


import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ServiciosAppService } from 'src/app/services/servicios-app.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(private alertController: AlertController,
    public userServives: UserServiceService,
    public serSer: ServiciosAppService,
    public uiService: UiServiceService) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
    // this.uiService.presentToast(`Su asistencia fue registrada: ${barcodes[0].displayValue}`, 'dark');
    this.registrarA(`${barcodes[0].displayValue}`)
  }


  async registrarA(data: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Asistencias',
      message: 'Desea registrar su asistencia?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {

            this.userServives.getUserDNI(data).subscribe(resp => {
              console.log(resp.user);

              this.serSer.createAsistencia({usuario_id: resp.user._id }).subscribe( resp =>  { 
                console.log(resp);

              })

              this.uiService.presentToast(`Su asistencia fue registrada: ${resp.user.nombre}`, 'dark');

            })

          }
        }
      ]
    });
    await alert.present();
  }


  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}