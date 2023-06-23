import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private router: Router,
              public toastController: ToastController,
              public alertController: AlertController,
              private loadingController: LoadingController,
              public menu: MenuController
              ) { }

  irA(url: string){
    this.router.navigateByUrl(url);
  }


  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 1000
    });
    toast.present();
  }

  async alertaInformativa(message: any, header: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentLoading(message: string) {
    const loading = await this.loadingController.create({
      message,
      spinner: 'dots',
      duration: 400
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  lockSideMenu(){
    this.menu.get().then((menu?: HTMLIonMenuElement) => {
      menu!.swipeGesture = false;
    });
  }


}
