import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServiciosAppService } from 'src/app/services/servicios-app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.scss'],
})
export class RecursosComponent implements OnInit {
  @Input() data: any;

  public recursos: any = [];
  public IMG: any;
  constructor(public modalCtrl: ModalController,
    public serviciosAPI: ServiciosAppService) { }

  ngOnInit() {
    this.cargarRecursos();
    this.IMG = environment.cloudinary+'recursos/';

    console.log(this.data);
  }




  dismiss() {
    this.modalCtrl.dismiss();
  }


  cargarRecursos(){
    this.serviciosAPI.getByIdRecursos({"carpeta_id": this.data._id}).subscribe( resp => {
      console.log(resp.recurso);
      this.recursos = resp.recurso;
    })
  }

}
