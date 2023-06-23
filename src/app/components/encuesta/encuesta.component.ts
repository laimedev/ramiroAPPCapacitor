import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
})
export class EncuestaComponent implements OnInit {

  public calificaicon = 0;

  constructor(public modalCtrl: ModalController,
    public uiService: UiServiceService,
    public alertCtrl: AlertController) { }

  ngOnInit() {}


  checkValue(event: any) { 
    const select = event.detail.value;
    this.calificaicon = event.detail.value;

    console.log(select);

  }


  dissmis(){
    this.modalCtrl.dismiss();
  }


  async enviarCalificacion(){
    const alert = await this.alertCtrl.create({
      // mode: 'ios',
      cssClass: 'my-custom-class',
      header: 'CONFIRMAR',
      message: 'Esta seguro de de enviar encuesta?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: () => {

            if(this.calificaicon !== 0) {
              this.uiService.presentToast('Encuesta enviada correctamente', 'success');
              this.modalCtrl.dismiss();
            } else {
              this.uiService.presentToast('Selecciones una calificación', 'danger');
            }
            

          } 
        }
      ]
    });


    await alert.present();
  }
}
