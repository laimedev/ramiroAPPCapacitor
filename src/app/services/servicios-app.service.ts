import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


const URL = environment.url;
const IMG = environment.cloudinary;


@Injectable({
  providedIn: 'root'
})
export class ServiciosAppService {

  constructor(public http: HttpClient,
    public navCtrl: NavController) { }



    getHerramientas(formData: any){
      return this.http.post(`${URL}herramienta/exportar`, formData )
      .pipe(
        tap( (resp: any) => { 
        })
      )
    }



  



    getCapacitaciones(){
      return this.http.get(`${URL}cursoCapacitacion/exportar` )
      .pipe(
        tap( (resp: any) => { 
        })
      )
    }


    createAsistencia(formData: any){
      return this.http.post(`${URL}asistencia`, formData)
      .pipe(
        tap( (resp: any) => { 
        })
      )
    }


    consultarDNI(formData: any){
      return this.http.post(`${URL}user/consultarDNI`, formData)
      .pipe(
        tap( (resp: any) => { 
        })
      )
    }
    

    getAsistencias() {
      return this.http.get(`${URL}asistencia/show` )
      .pipe(
        tap( (resp: any) => { 
        })
      ) 
    }
    
    
    getByIdCapacitacion(trabajo: any): Observable<any> {
      return this.http.post<any>(`${URL}unidad/showByIDCapacitacion`, trabajo)
    }


    cargarRepositorios(): Observable<any> {
      return this.http.get<any>(`${URL}repositorio/exportar`)
    }


    cargarCarpetas(): Observable<any> {
      return this.http.get<any>(`${URL}carpeta/exportar`)
    }



    cargarCarpetasPorID(id: any): Observable<any> {
      return this.http.post<any>(`${URL}carpeta/showByIDUser`, {_id: id })
    }
    
    

    getByIdRecursos(repositorio: any): Observable<any> {
      return this.http.post<any>(`${URL}recurso/showByID`, repositorio)
    }


    guardarMisCursos(formData : any){
      return this.http.post(`${URL}miscursos/`, formData )
      .pipe(
        tap( (resp: any) => { 
          console.log(resp);
        })
      )
    }

    getByIdMisCursos(misCursos: any): Observable<any> {
      return this.http.post<any>(`${URL}miscursos/showByID`, misCursos)
    }


    deleteMisCursos(id: any): Observable<any> {
      return this.http.delete<any>(`${URL}miscursos/`+ id)
    }

}
