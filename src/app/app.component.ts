import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UiServiceService } from './services/ui-service.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Mi Card ID', url: '/card-id', icon: 'qr-code' },
    { title: 'Repositorios', url: '/repositorios', icon: 'folder' },
    { title: 'Capacitaciones', url: '/capacitaciones', icon: 'server' },
    { title: 'Calendario', url: '/homeFake', icon: 'calendar' },
    { title: 'Herramientas', url: '/herramientas', icon: 'book' },
    { title: 'Resultados', url: '/resultados', icon: 'podium' },
    { title: 'Certificacion', url: '/certificado', icon: 'ribbon' },
    { title: 'Configuración', url: 'homeFake', icon: 'settings' },
  ];
  public labels = [
    { title: 'Finalizar', url: 'login', icon: 'exit'}
  ];
  constructor(public alertController: AlertController,
    public uiService: UiServiceService) {}


  async logout() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Finalizar',
      message: 'Desea cerrar sesión RAMIRO PRIALE APP?',
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
            localStorage.removeItem('token');
            this.uiService.irA('login');
          }
        }
      ]
    });
    await alert.present();
  }


}
