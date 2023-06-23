import { Component, Input, OnInit } from '@angular/core';
import { UiServiceService } from '../../services/ui-service.service';
import { UserServiceService } from '../../services/user-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  showPassword = false;
  passwordToggleIcon = "eye-off-outline";
  showPassword2 = false;
  passwordToggleIcon2 = "eye-off-outline";


  public data : any;
  public tipodoc: any;

  public formSubmited = false;
  public registerForm = this.fb.group({
    nombre: [ '' , Validators.required],
    email: [ '' , Validators.required],
    celular: [ '' , Validators.required],
    dni: [ '' , Validators.required],
    password_show: [ '' , Validators.required],
    password_show_confirm: ['', Validators.required],
    terminos: [ false, Validators.required],
  }, { 
      validators: this.passwordsIguales('password_show', 'password_show_confirm')
  });


  constructor(public uiService: UiServiceService,
              public userService: UserServiceService,
              private fb: FormBuilder,
              public menu: MenuController) {}


  ngOnInit() {
    this.uiService.lockSideMenu();
  }


  getDataUser(){
    this.userService.$getObjectSource.subscribe(data => {
      this.data = data;
      for(let data of this.data) {
        console.log(data.tipodoc);
        if(data.tipodoc == 0){ this.tipodoc = 'Carnet de extranjeria';}
        else if(data.tipodoc == 1){ this.tipodoc = 'DNI';}
        else if(data.tipodoc == 2) { this.tipodoc = 'Pasaporte';}
        else if(data.tipodoc == 3) { this.tipodoc = 'RUC';}
      }
    }).unsubscribe();
  }





  // getRoles(){
  //   this.userService.getRole()
  //   .subscribe(({rows}) => {
  //       this.role = rows;
  //   })
  // }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye-off-outline'){
      this.passwordToggleIcon = 'eye-outline'
    } else {
      this.passwordToggleIcon = 'eye-off-outline';
    }
  }

  togglePassword2(): void {
    this.showPassword2 = !this.showPassword2;
    if (this.passwordToggleIcon2 == 'eye-off-outline'){
      this.passwordToggleIcon2 = 'eye-outline'
    } else {
      this.passwordToggleIcon2 = 'eye-off-outline';
    }
  }

  camposNoValido(campo: string): boolean {
    if( this.registerForm.get(campo)?.invalid && this.formSubmited) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmited;
  }

  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password_show')?.value;
    const pass2 = this.registerForm.get('password_show_confirm')?.value;

    if( (pass1 !== pass2) && this.formSubmited ) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return ( formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      if( pass1Control?.value === pass2Control?.value ) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true});
      }
    }
  }

  crearUsuario() {

    this.formSubmited = true;
    
    if (this.camposNoValido('nombre')){
      this.uiService.presentToast('El nombre es obligatorio', 'dark');
    } else if (this.camposNoValido('dni')){
      this.uiService.presentToast('El documento es obligatorio', 'dark');
    } else if (this.camposNoValido('celular')){
      this.uiService.presentToast('El celular es obligatorio', 'dark');
    } else if (this.camposNoValido('email')){
      this.uiService.presentToast('La correo es obligatoria', 'dark');
    } else if (this.camposNoValido('password_show')){
      this.uiService.presentToast('La contraseña es obligatoria', 'dark');
    } else if (this.contrasenasNoValidas()){
      this.uiService.presentToast('Las contraseñas no coinciden', 'dark');
    } else if (this.aceptaTerminos()){
      this.uiService.presentToast('Acepte los terminos y condiciones', 'dark');
    } else {

        console.log(this.registerForm.value);


      this.userService.createUser(this.registerForm.value)
      .subscribe( resp => {
      // localStorage.setItem('id_client_verify', this.registerForm.get('id_login').value);

      if(resp.ok == true){
        localStorage.setItem('token', resp.token);
        this.uiService.presentToast('Todos los datos son correcto', 'dark');
        this.uiService.irA('home');
      } else {
        this.uiService.presentToast( `El documento ${resp.err.keyValue.dni} ya fue registrado.`, 'dark');
      }

      }, (err) =>   {
        console.log('error', err);
      });


    }
  }


  irHome(){
    this.uiService.irA('login');
    this.registerForm.reset();
  }


  codeMail() {
    localStorage.setItem('id_client_verify', this.registerForm.get('id_cliente')?.value);
    this.uiService.irA('code-mail');
  }

}
