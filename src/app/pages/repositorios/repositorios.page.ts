import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServiciosAppService } from 'src/app/services/servicios-app.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-repositorios',
  templateUrl: './repositorios.page.html',
  styleUrls: ['./repositorios.page.scss'],
})
export class RepositoriosPage implements OnInit {

  public id = localStorage.getItem('id');


  public respos: any = [];

  constructor(public serviceAPP: ServiciosAppService,
    public userServives: UserServiceService,
    public modalCtrl: ModalController) { }

  ngOnInit() {

    this.userServives.getUserDNI(this.id).subscribe(resp => {

     console.log(resp);

     this.serviceAPP.cargarCarpetasPorID(resp.user.area_id).subscribe(resp => {
      this.respos = resp['carpeta'];
      console.log(resp);

    })



    })

      
   
  }



  
  async openDetails(data: any){
    // const modal = await this.modalCtrl.create({
    //     component: RecursosComponent,
    //     componentProps: {
    //       data: data
    //     },
    //     // swipeToClose: true,
    //     animated:true,
    //     mode:'ios',
    // });
    // await modal.present();
  }


}
