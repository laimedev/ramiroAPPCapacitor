import { Component, OnInit } from '@angular/core';
import { ServiciosAppService } from 'src/app/services/servicios-app.service';
import { UserServiceService } from 'src/app/services/user-service.service';


// import { ChartConfiguration, ChartData, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
// import { BaseChartDirective, Color, Label } from 'ng2-charts';


import { EncuestaComponent } from 'src/app/components/encuesta/encuesta.component';
import { ModalController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {

  public id = localStorage.getItem('id');
  public resultado: any = [];


  
  public humedo1: any[] = [7, 5,3,6,9];
  public seco2: any[] = [];
  public fechas: any[] = [];
  public titulo: any[] = [];
  public notas: any[] = [];







  constructor(public servApp: UserServiceService,
    public uiService: UiServiceService,
    public modalCtrl: ModalController) { }

  ngOnInit() {

    this.cargarResultados();

  }



  cargarResultados(){
    this.servApp.obetenerResultadosID(this.id).subscribe( resp => {
      this.resultado = resp['resultado'];


      console.log(resp.resultado);
      this.resultado = resp.resultado;

    })
  }




  async encuenta() {
    const modal = await this.modalCtrl.create({
      component: EncuestaComponent,
      componentProps: {
        // data: data
      },
      // swipeToClose: true,
      animated:true,
      mode:'md',
      cssClass: 'my-custom-modal-niubiz',
  });
  await modal.present();
  }

}
