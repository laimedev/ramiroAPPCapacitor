import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ServiciosAppService } from 'src/app/services/servicios-app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.scss'],
})
export class UnidadComponent implements OnInit {


  @Input() data: any;

  public IMG: any;
  public REC: any;
  public UNI: any;

  public unidad?: any[];

  constructor(public modalCtrl: ModalController,
    public alertController: AlertController,
    public router: Router,
    public serviciosAPI: ServiciosAppService) { }

  ngOnInit() {

    console.log(this.data);


    this.IMG = environment.cloudinary+'capacitacionesPortadas/';
    this.REC = environment.cloudinary+'capacitaciones/';
    this.UNI = environment.cloudinary+'unidades/';

    console.log('RUTA DE IMAGENES');
    console.log(this.UNI);


    if(this.data.tipo == "Curso"){
      console.log('es curso');
      console.log(this.data._id);
      this.serviciosAPI.getByIdCapacitacion({"id_capacitacion": this.data.id_capacitacion}).subscribe(resp => {
        console.log(resp);
        this.unidad = resp.unidad;
      })
    } else {
      console.log('no es');
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
    
  }


  async irSesiones(data: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'SESIONES',
      message: `Ingresar a sesiones  ${data.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: async () => {
              this.modalCtrl.dismiss()
              this.router.navigate([`pruebas/`+ data._id])
          }
        }
      ]
    });
    await alert.present();
  }


  
}
