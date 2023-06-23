import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  UserLogin } from '../interfaces/interfaces';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private objectSource = new BehaviorSubject<{}>({});
  $getObjectSource = this.objectSource.asObservable();

  token: any = null; 
  private userlogin: UserLogin = {};

  constructor(public http: HttpClient,
              public navCtrl: NavController) { }

  sendObjectSoruce(data: any) {
    this.objectSource.next(data);
  }


 

  createUser(formData: any){
    return this.http.post(`${URL}user/create`, formData)
    .pipe(
      tap( (resp: any) => { 
        console.log(resp);
        if(resp.token) {
          localStorage.setItem('id', resp.id);
        } 
      })
    )
  }

  loginTLM(formData: any){
    return this.http.post(`${URL}user/login`, formData)
    .pipe(
      tap( (resp: any) => { 
        if(resp.token) {
          localStorage.setItem('id', resp.id);
        } 
      }))
  }



  getUserDNI(id: any){
    return this.http.get(`${URL}user/view/${id}` )
    .pipe(
      tap( (resp: any) => { 
        // console.log(resp);
      })
    )
  }



  updateUserDNI(dni: any, formData: any){
    return this.http.post(`${URL}user/updateAPP/${dni}`, formData )
    .pipe(
      tap( (resp: any) => { 
        // console.log(resp);
      })
    )
  }



  recuperarClave(formData: any){
    return this.http.post(`${URL}user/forget_password`, formData )
    .pipe(
      tap( (resp: any) => { 
        // console.log(resp);
      })
    )
  }



  obetenerPruebaID(_id : any){
    // showByID
    return this.http.post(`${URL}prueba/showByID`, { _id: _id} )
    .pipe(
      tap( (resp: any) => { 
        // console.log(resp);
      })
    )
  }



  getByIdUnidad(_id: any) {
    return this.http.post(`${URL}unidad/showByID`, { _id: _id} )
    .pipe(
      tap( (resp: any) => { 
        // console.log(resp);
      })
    )
  }




  // registroResultado ( resultado: any ) {
  //   const headers = new HttpHeaders({
  //     'x-token' : localStorage.getItem('token')
  //   });
  //  return  this.http.post(`${ URL }resultado`, resultado , { headers })
  //   .pipe(tap( (resp: any) => {
  //     console.log(resp);
  //     this.nuevoResultado.emit( resp['resultado'] );
  //   })
  //   )
  // }





  realizarPrueba(formData: any) {
    const headers = new HttpHeaders({
      'x-token' : localStorage.getItem('token')!
    });

    return this.http.post(`${URL}resultado`, formData , { headers })
    .pipe(
      tap( (resp: any) => { 
        // console.log(resp);
      })
    )
  }







  obetenerResultadosID(usuario_id : any){
    return this.http.post(`${URL}resultado/showByID`, { usuario_id: usuario_id} )
    .pipe(
      tap( (resp: any) => { 
        console.log(resp);
      })
    )
  }


  


  


}
