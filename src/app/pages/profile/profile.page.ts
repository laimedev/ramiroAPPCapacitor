import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
// import { Camera } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { UserServiceService } from 'src/app/services/user-service.service';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  id = localStorage.getItem('id')
  public formSubmited = false;
  public registerForm = this.fb.group({
    nombre: [ '' , Validators.required],
    apellidos: [ '' , Validators.required],
    foto: [ ''],
    celular: [ '' , Validators.required],
    email: [ '' , Validators.required],
    dni: [ '' , Validators.required],
  });

  public imgUrl: any;
  public noimgUrl = 'assets/icon/favicon.png';
  constructor(private fb: FormBuilder,
    public uiService: UiServiceService,
    public userServives: UserServiceService,
    // private camera: Camera,
    public actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.userServives.getUserDNI(this.id).subscribe(resp => {
      console.log(resp.user);
      this.registerForm.get('nombre')?.setValue(resp.user['nombre']);
      this.registerForm.get('apellidos')?.setValue(resp.user['apellidos']);
      this.registerForm.get('celular')?.setValue(resp.user['celular']);
      this.registerForm.get('email')?.setValue(resp.user['email']);
      this.registerForm.get('dni')?.setValue(resp.user['dni']);
      this.registerForm.get('foto')?.setValue(resp.user['foto']);
      if(this.registerForm.get('foto') !== null){
        this.imgUrl = resp.user['foto'];
      }
    })
    // console.log(this.id);
  }


  camposNoValido(campo: string): boolean {
    if( this.registerForm.get(campo)?.invalid && this.formSubmited) {
      return true;
    } else {
      return false;
    }
  }


  actualizarInformacion(){
    this.formSubmited = true;
    if(this.registerForm.invalid){
      this.uiService.presentToast('Campos Incompletos', 'danger');
      return
    }
    this.userServives.updateUserDNI(this.id, this.registerForm.value).subscribe(resp => {
      console.log(resp);
      this.uiService.presentToast('Información actualizada', 'primary');
    })
  }










  getCamera(){
    // this.camera.getPicture({
    //   quality: 100,
    //   targetWidth: 200,
    //   targetHeight: 200,
    //   sourceType: this.camera.PictureSourceType.CAMERA,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   correctOrientation: true
    // }).then((res) => {
    //   this.imgUrl = 'data:image/jpeg;base64,' + res;
    //   console.log('CAMARAAAAAAAAAA: ', res);
    //   console.log(this.imgUrl);
    // }).catch(e => {
    //   console.log(e);
    // })
  }

  getGallery(){
    // this.camera.getPicture({
    //   quality: 100,
    //   targetWidth: 200,
    //   targetHeight: 200,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   correctOrientation: true,
    // }).then((res) => {
    //   this.imgUrl =  'data:image/jpeg;base64,' + res;
    //   console.log('GALERIAAAAAAA: ', res);
    //   console.log(this.imgUrl);

    // }).catch(e => {
    //   console.log(e);
    // })
  }



  

  async openOption(){
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Tomar Foto',
          icon: 'camera-outline',
            handler: () => {
              this.getCamera();
            }
        },
        {
          text: 'Abrir Galeria',
          icon: 'image-outline',
            handler: () => {
              this.getGallery();
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
}
