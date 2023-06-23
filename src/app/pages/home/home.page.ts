import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-service.service';
// import * as introJs from 'intro.js/intro.js';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // slideOpts = {
  //   initialSlide: 0,
  //   slideShadows: true,
  //   autoplay: true,
  //   speed: 300,
  // }

  user: any;

  public textoBuscar: string = '';

  public data = [];

  constructor(public uiService: UiServiceService,
              public actionSheetController: ActionSheetController,
              public modalCtrl: ModalController,
              public appCom: AppComponent,
              
              ) { 
              

              }


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  ionViewWillEnter() { 
    if(localStorage.getItem('introjs') == 'true'){
      this.intro();
    }
    localStorage.removeItem('introjs');
  }

  buscar(event: any) {
    this.textoBuscar = event.detail.value;
  }

  

  async details(data: any){
  }

  intro(){
    // introJs(document.querySelector("app-home")).setOptions({
    //   'tooltipClass': 'introjs',
    //   'nextLabel': 'Seguir',
    //   'prevLabel': 'Atras',
    //   'doneLabel': 'Entendido',
    //   'hidePrev': true,
    //   'exitOnEsc': false,
    //   'exitOnOverlayClick': false,
    //   'disableInteraction': false,
    // }).start(); 
  }

  async profile(){
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Cerrar sesión',
          icon: 'exit-outline',
            handler: () => {
              this.appCom.logout();
            }
        },
        {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }


  irRA() { this.uiService.irA('situations')}

}
