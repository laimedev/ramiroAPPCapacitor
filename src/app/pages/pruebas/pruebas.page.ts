import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.page.html',
  styleUrls: ['./pruebas.page.scss'],
})
export class PruebasPage implements OnInit {

  public id: any = 0;


  public prueba: any = [];


  pre1: any= [] ;
  pre2: any= [] ;
  pre3: any= [] ;
  pre4: any= [] ;
  pre5: any= [] ;
  pre6: any= [] ;
  pre7: any= [] ;
  pre8: any= [] ;
  pre9: any= [] ;
  pre10: any= [] ;
 
  public resp1: any;
  public resp2: any;
  public resp3: any;
  public resp4: any;
  public resp5: any;
  public resp6: any;
  public resp7: any;
  public resp8: any;
  public resp9: any;
  public resp10: any;
 
  public correcto: any;
  public correcto2: any;
  public correcto3: any;
  public correcto4: any;
  public correcto5: any;
  public correcto6: any;
  public correcto7: any;
  public correcto8: any;
  public correcto9: any;
  public correcto10: any;
 
  public r1 = 0;
  public r2 = 0;
  public r3 = 0;
  public r4 = 0;
  public r5 = 0;
  public r6 = 0;
  public r7 = 0;
  public r8 = 0;
  public r9 = 0;
  public r10 = 0;
 
  public total: any = 0;

  public formRegisterd = false;
  public formRegister = this.formBuilder.group({
    capacitacion_id: [''],
    nota: ['', Validators.required],
    usuario_id: ['', Validators.required],
    observaciones: ['Completado', Validators.required],
    nombrePrueba: ['', Validators.required],
    nombreUsuario:  ['ALEX', Validators.required],
  });
  
  public nombre: any;
  public seccion: any;
 
 
  public formTest = false;
  


  

  constructor(private route: ActivatedRoute,
    public toastController: ToastController,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
              public userService: UserServiceService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id  = params['id'];
      const id = params['id']; // Obtén el valor del parámetro 'id' de la URL
      console.log(id); // Muestra el ID en la consola o realiza cualquier otra operación con él
    });



    this.cargarPrueba();


  }



  cargarPrueba(){
    this.userService.getByIdUnidad(this.id).subscribe((resp: any) => {

      console.log(resp);
      console.log('id prueba a filtrar');
      console.log(resp.unidad[0].tarea);



      this.userService.obetenerPruebaID(resp.unidad['0'].tarea).subscribe( (resp: any) => {
        this.prueba = resp.prueba[0];
        // console.log(this.prueba);

        console.log(resp);


        this.formRegister.get('capacitacion_id')?.setValue(resp.prueba[0]._id);
        this.formRegister.get('nombrePrueba')?.setValue(resp.prueba[0].tituloPrueba);
        


        this.pre1 = JSON.parse(resp.prueba[0]['pre1']);
        this.pre2 = JSON.parse(resp.prueba[0]['pre2']);
        this.pre3 = JSON.parse(resp.prueba[0]['pre3']);
        this.pre4 = JSON.parse(resp.prueba[0]['pre4']);
        this.pre5 = JSON.parse(resp.prueba[0]['pre5']);
        this.pre6 = JSON.parse(resp.prueba[0]['pre6']);
        this.pre7 = JSON.parse(resp.prueba[0]['pre7']);
        this.pre8 = JSON.parse(resp.prueba[0]['pre8']);
        this.pre9 = JSON.parse(resp.prueba[0]['pre9']);
        this.pre10 = JSON.parse(resp.prueba[0]['pre10']);


        this.resp1 = JSON.stringify(this.pre1[0].pc);
        this.resp2 = JSON.stringify(this.pre2[0].pc);
        this.resp3 = JSON.stringify(this.pre3[0].pc);
        this.resp4 = JSON.stringify(this.pre4[0].pc);
        this.resp5 = JSON.stringify(this.pre5[0].pc);
        this.resp6 = JSON.stringify(this.pre6[0].pc);
        this.resp7 = JSON.stringify(this.pre7[0].pc);
        this.resp8 = JSON.stringify(this.pre8[0].pc);
        this.resp9 = JSON.stringify(this.pre9[0].pc);
        this.resp10 = JSON.stringify(this.pre10[0].pc);




      })
    })
  }





  checkValue(event: any) { 
    const select = event.detail.value;
    const res = `"${select}"` 
    if(res === this.resp1){
      this.correcto =  true;
      this.r1 = 2;
      this.finalizar();
      // this.uiService.presentToast('Respuesta Correcta Bravo!!', 'success');

    } else {
      this.correcto = false;
      this.r1 = 0;
      this.finalizar();
      // this.uiService.presentToast('Respuesta Incorrecta!!', 'danger');

    }
    // console.log(this.r1)

  }



  checkValue2(event: any) { 
    const select = event.detail.value;
    const res = `"${select}"` 
    if(res === this.resp2){
      this.correcto2 =  true;
      this.r2 =  2;
      this.finalizar();
      // this.uiService.presentToast('Respuesta Correcta Bravo!!', 'success');


    } else {
      this.correcto2 = false;
      this.r2 = 0;
      this.finalizar();
      // this.uiService.presentToast('Respuesta Incorrecta!!', 'danger');

    }
  }


  checkValue3(event: any) { 
    const select = event.detail.value;
    const res = `"${select}"` 
    if(res === this.resp3){
      this.correcto3 =  true;
      this.r3 =  2;
      this.finalizar();
      // this.uiService.presentToast('Respuesta Correcta Bravo!!', 'success');

    } else {
      this.correcto3 = false;
      this.r3 = 0;
      this.finalizar();
      // this.uiService.presentToast('Respuesta Incorrecta!!', 'danger');

    }
  }


  checkValue4(event: any) { 
    const select = event.detail.value;
    const res = `"${select}"` 
    if(res === this.resp4){
      this.correcto4 =  true;
      this.r4 =  2;
      this.finalizar();
      // this.uiService.presentToast('Respuesta Correcta Bravo!!', 'success');

    } else {
      this.correcto4 = false;
      this.r4 = 0;
      this.finalizar();
      // this.uiService.presentToast('Respuesta Incorrecta!!', 'danger');

    }
  }


  checkValue5(event: any) { 
    const select = event.detail.value;
    const res = `"${select}"` 
    if(res === this.resp5){
      this.correcto5 =  true;
      this.r5 =  2;
      this.finalizar();
      // this.uiService.presentToast('Respuesta Correcta Bravo!!', 'success');

    } else {
      this.correcto5 = false;
      this.r5 = 0;
      this.finalizar();
      // this.uiService.presentToast('Respuesta Incorrecta!!', 'danger');

    }
  }


  checkValue6(event: any) { 
    const select = event.detail.value;
    const res = `"${select}"` 
    if(res === this.resp6){
      this.correcto6 =  true;
      this.r6 =  2;
      this.finalizar();
      // this.uiService.presentToast('Respuesta Correcta Bravo!!', 'success');

    } else {
      this.correcto6 = false;
      this.r6 = 0;
      this.finalizar();
      // this.uiService.presentToast('Respuesta Incorrecta!!', 'danger');

    }
  }


  checkValue7(event: any) { 
    const select = event.detail.value;
    const res = `"${select}"` 
    if(res === this.resp7){
      this.correcto7 =  true;
      this.r7 =  2;
      this.finalizar();
      // this.uiService.presentToast('Respuesta Correcta Bravo!!', 'success');

    } else {
      this.correcto7 = false;
      this.r7 = 0;
      this.finalizar();
      // this.uiService.presentToast('Respuesta Incorrecta!!', 'danger');

    }
  }


  checkValue8(event: any) { 
    const select = event.detail.value;
    const res = `"${select}"` 

 

    if(res === this.resp8.replace(/[\/\\]+/g,'')){
      this.correcto8 =  true;
      this.r8 =  2;
      this.finalizar();
      // this.uiService.presentToast('Respuesta Correcta Bravo!!', 'success');

    } else {
      this.correcto8 = false;
      this.r8 = 0;
      this.finalizar();
      // this.uiService.presentToast('Respuesta Incorrecta!!', 'danger');

    }
  }

  checkValue9(event: any) { 
    const select = event.detail.value;
    const res = `"${select}"` 
    if(res === this.resp9){
      this.correcto9 =  true;
      this.r9 =  2;
      this.finalizar();
      // this.uiService.presentToast('Respuesta Correcta Bravo!!', 'success');

    } else {
      this.correcto9 = false;
      this.r9 = 0;
      this.finalizar();
      // this.uiService.presentToast('Respuesta Incorrecta!!', 'danger');

    }
  }

  checkValue10(event: any) { 
    const select = event.detail.value;
    const res = `"${select}"` 
    if(res === this.resp10){
      this.correcto10 =  true;
      this.r10 =  2;
      this.finalizar();
      // this.uiService.presentToast('Respuesta Correcta Bravo!!', 'success');

    } else {
      this.correcto10 = false;
      this.r10 = 0;
      this.finalizar();
      // this.uiService.presentToast('Respuesta Incorrecta!!', 'danger');

    }
  }







  finalizar(){
    this.total = this.r1 + this.r2 + this.r3 +this.r4 + this.r5 + this.r6 + this.r7 + this.r8  + this.r9 + this.r10;
    console.log(this.total)
    this.formRegister.get('nota')?.setValue(this.total);


  }


  registrar(){

  }




  async  finalizarTarea(){

    const id = JSON.stringify(localStorage.getItem('id'));
      // console.log(JSON.parse(id));
    this.formRegister.get('usuario_id')?.setValue(JSON.parse(id));



    this.formRegisterd = true;
    console.log(this.formRegister.value);
    if( this.formRegister.invalid) {
      return;
    }
    const alert = await this.alertCtrl.create({
      // mode: 'ios',
      cssClass: 'my-custom-class',
      header: 'CONFIRMAR',
      message: 'Esta seguro de enviar la tarea?',
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


            this.userService.realizarPrueba(this.formRegister.value).subscribe(resp => {
              this.presentToast('Resultado enviado correctamente ')
              this.navCtrl.navigateRoot("home", {animated: true});
              console.log(resp);
            }, (err) => {
              console.log(err);
            })
            // this.testService.registroResultado(this.formRegister.value)
            // .subscribe(resp => {
            //   console.log(resp);
            //     console.log('resutado creada');
            //     this.presentToast('Resultado enviado correctamente ')
            //     console.log(resp);
            //     this.navCtrl.navigateRoot("home", {animated: true});
            //     this.userServives.updateHistoria(this.id, this.formRegisterPretest.value).subscribe(resp => {
            //       console.log(resp);
            //     })
            // }, (err) => {
            //   console.log(err);
            // })
          }
        }
      ]
    });


    await alert.present();
}



async presentToast(txt: any) {
  const toast = await this.toastController.create({
    message: txt,
    duration: 1000,
    position : 'bottom',
  });
  toast.present();
}



}
