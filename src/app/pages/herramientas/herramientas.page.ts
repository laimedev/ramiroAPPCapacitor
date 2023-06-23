import { Component, OnInit } from '@angular/core';
import { ServiciosAppService } from 'src/app/services/servicios-app.service';
import { environment } from 'src/environments/environment';

// const IMG = environment.cloudinary;

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.page.html',
  styleUrls: ['./herramientas.page.scss'],
})
export class HerramientasPage implements OnInit {

  public data: any = [];


  public idCategoria = '6456a8a0771e6431247611cc'

  constructor(public servApp: ServiciosAppService) { }


  public IMG = environment.cloudinary;


  slideOpts = {
    initialSlide: 0,
    slidesPerView: 2.5,
    slideShadows: true,
    autoplay: true,
    speed: 300,
  }



  ngOnInit() {
    this.listarHerramientas();
  }

  listarHerramientas(){
    this.servApp.getHerramientas({categoria_id: this.idCategoria}).subscribe(resp => {
      console.log(resp);
      this.data = resp.data;
    })
  }



  seleccionarOpcion(event: any) {
    this.idCategoria = event.target.value;
    console.log(this.idCategoria);
    this.listarHerramientas();
  }


}
