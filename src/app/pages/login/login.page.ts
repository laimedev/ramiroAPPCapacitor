import { Component, OnInit } from '@angular/core';
import { UiServiceService } from '../../services/ui-service.service';
import { Validators, FormBuilder } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showPassword = false;
  passwordToggleIcon = "eye-off-outline";


  public formSubmited = false;

  public registerForm = this.fb.group({
    dni: [ '' , Validators.required],
    password: [ '' , Validators.required],
  });

  isShown = false;
  checkFocus(){ this.isShown = true; }
  checkBlur() { this.isShown = false; }
  

  constructor(public uiService: UiServiceService,
              private fb: FormBuilder,
              public userService: UserServiceService,
              public menu: MenuController
              ) {
                
    
               }

  ngOnInit() {
    // this.getRoles();
    this.uiService.lockSideMenu();
    
  }


  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye-off-outline'){
      this.passwordToggleIcon = 'eye-outline'
    } else {
      this.passwordToggleIcon = 'eye-off-outline';
    }
  }


  login() {
    this.formSubmited = true;
    if (this.camposNoValido('dni')) {
      this.uiService.presentToast('Ingrese su nº de documento', 'dark');
    } else if (this.camposNoValido('password')){
      this.uiService.presentToast('Ingrese su contraseña', 'dark');
    } else {
      this.userService.loginTLM(this.registerForm.value)
      .subscribe( resp => {
        console.log(resp);
        if(resp.ok == true){
          console.log('ingresar');
          localStorage.setItem('token',  resp['token']);
          this.uiService.irA('home');
          localStorage.setItem('introjs', 'true');
          this.uiService.presentLoading('Espere porfavor...');
        } else {
          console.log('sigue intentando')
          this.uiService.presentToast(resp.mensaje , 'dark');

        }
      }, (err) =>   {
        console.log('error', err);
      });
    }
  }


  camposNoValido(campo: string): boolean {
    if( this.registerForm.get(campo)?.invalid && this.formSubmited) {
      return true;
    } else {
      return false;
    }
  }




  irRegister() {
    this.uiService.irA('register');
    localStorage.clear();
  }


}
