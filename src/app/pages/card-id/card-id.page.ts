import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController, Platform } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-card-id',
  templateUrl: './card-id.page.html',
  styleUrls: ['./card-id.page.scss'],
})
export class CardIDPage implements OnInit, AfterViewInit, OnDestroy {

  public id: any = localStorage.getItem('id')
  elementType = 'canvas';
  public code = '';




  result: any = null;
  scanActive = false;
  compounds: any[] = [];
  data: any;



  public user: any = [];

  constructor(public uiService: UiServiceService,
    private alertCtrl: AlertController,
    private platform: Platform,
    public userServives: UserServiceService) { }

  ngOnInit() {

    this.userServives.getUserDNI(this.id).subscribe(resp => {
      console.log(resp.user);
      this.user = resp.user;
      this.code = resp.user.dni;
      // this.registerForm.get('nombre')?.setValue(resp.user['nombre']);
      // this.registerForm.get('celular')?.setValue(resp.user['celular']);
      // this.registerForm.get('email')?.setValue(resp.user['email']);
      // this.registerForm.get('dni')?.setValue(resp.user['dni']);
      // this.registerForm.get('foto')?.setValue(resp.user['foto']);
      // if(this.registerForm.get('foto') !== null){
      //   this.imgUrl = resp.user['foto'];
      // }
    })


  }


  scannerQR(){
  
  }


  ngAfterViewInit() {
    if (this.platform.is('mobileweb')) {
      console.warn('Debe estar en un dispositivo para activar usar el scanner.');
      return;
    }
    BarcodeScanner.prepare();
  }


  async startScanner() {
    const allowed = await this.checkPermission();

    if (allowed) {
      this.scanActive = true;
      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        this.result = result.content;
        this.scanActive = false;
      }
    }
  }

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });

      if (status.granted) {
        // We are fine
        resolve(true);
      } else if (status.denied) {
        // Denied before
        const alert = await this.alertCtrl.create({
          header: 'No permission',
          message: 'Please allow camera access in your settings',
          buttons: [{
            text: 'No',
            role: 'cancel'
          },
          {
            text: 'Open Settings',
            handler: () => {
              resolve(false);
              BarcodeScanner.openAppSettings();
            }
          }]
        });

        await alert.present();
      } else {
        resolve(false);
      }
    });
  };

  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  ngOnDestroy() {
    BarcodeScanner.stopScan();
  }



}
