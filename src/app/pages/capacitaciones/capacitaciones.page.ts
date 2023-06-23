import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { UnidadComponent } from 'src/app/components/unidad/unidad.component';
import { ServiciosAppService } from 'src/app/services/servicios-app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-capacitaciones',
  templateUrl: './capacitaciones.page.html',
  styleUrls: ['./capacitaciones.page.scss'],
})
export class CapacitacionesPage implements OnInit {

  public IMG: any;
  public REC: any;
  public data: any = [];


  public id = localStorage.getItem('id');




  public misCursos: any = [];
  public dataMisCuros?: any = [];

  public idCapacitacion: any;

  selectedSegment: string = 'option1';



  constructor(public servApp: ServiciosAppService,
          public alertController: AlertController,
          public modalCtrl: ModalController) { }

  ngOnInit() {
    if(localStorage.getItem('misCursos')) {
      console.log('existe cursos')
    } else {
      console.log('no existe cursos')
      localStorage.setItem('misCursos', JSON.stringify([]))
    }

    this.IMG = environment.cloudinary+'capacitacionesPortadas/';
    this.REC = environment.cloudinary+'capacitaciones/';
    
    this.listarCapacitaciones();
    this.cargarMisCursos();
  }


  listarCapacitaciones(){
    this.servApp.getCapacitaciones().subscribe(resp => {
      console.log(resp);
      this.data = resp.data;
    })
  }


  cargarMisCursos(){
    // this.dataMisCuros = JSON.parse(localStorage.getItem('misCursos'));
    // console.log(this.misCursos);

    this.servApp.getByIdMisCursos({ usuario_id: this.id }).subscribe(resp => {
      console.log(resp['miscursos']);
    
      const cursos = resp['miscursos'];
      const uniqueCursos: any = {};
    
      cursos.forEach((curso: any) => {
        const idCapacitacion = curso.id_capacitacion;
        if (!uniqueCursos[idCapacitacion]) {
          uniqueCursos[idCapacitacion] = curso;
        }
      });
    
      this.dataMisCuros = Object.values(uniqueCursos);
    });
    

  }

  async openDetails(data: any){
    // this.uiService.irA('game-complete')

    console.log(data);
    const modal = await this.modalCtrl.create({
        component: UnidadComponent,
        componentProps: {
          data: data
        },
        // swipeToClose: true,
        animated:true,
        mode:'ios',
        // cssClass: 'my-custom-modal-introduction',
    });
    await modal.present();
  }



  async irCuro(data: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'INSCRIPCIÓN',
      message: `Deseas inscribirte al curso ${data.nombre}`,
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
          handler: () => {
            // this.misCursos.push(data);
            // localStorage.setItem( 'misCursos' , JSON.stringify(this.misCursos))
            // this.cargarMisCursos();
            console.log(data);

            const info = {
              id_capacitacion: data._id,
              nombre: data.nombre,
              descripcion: data.descripcion,
              imagen: data.imagen,
              tipo: data.tipo,
              duracion: data.duracion,
              fecha_inicio: data.fecha_inicio,
              fecha_fin: data.fecha_fin,
              usuario_id: this.id
            }

            this.servApp.guardarMisCursos(info).subscribe(resp => {
              console.log(resp);
            })

            this.cargarMisCursos();

          }
        }
      ]
    });
    await alert.present();
  }


  async quitarCurso(data: any){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'QUITAR',
      message: `Deseas quitar al curso ${data.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Quitar',
          handler: () => {
            // this.misCursos.push(data);
            // localStorage.setItem( 'misCursos' , JSON.stringify(this.misCursos))
            // this.cargarMisCursos();
            console.log(data._id);

            this.servApp.deleteMisCursos(data._id).subscribe(resp => {
              console.log(resp);
              this.cargarMisCursos();

            }, error => {
              console.log(error);
            })
            


            // const cursos = JSON.parse(localStorage.getItem('misCursos'));
            //   if (cursos && cursos.length > 0) {
            //     const index = cursos.findIndex((curso: any) => curso._id === data._id);
            //     if (index !== -1) {
            //       cursos.splice(index, 1);
            //       localStorage.setItem('misCursos', JSON.stringify(cursos));
            //       this.cargarMisCursos();
            //       console.log(this.misCursos);
            //     }
            //   }

          }
        }
      ]
    });
    await alert.present();
  }

}


