import { Pipe, PipeTransform } from '@angular/core';
// import { filter } from 'rxjs/operators';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[], texto: string): any[] {

    if( texto === ''){
      return arreglo;
    } 

    // texto = texto.toLowerCase();
    texto = texto;

    return arreglo.filter(item => {
      // return item.id_ordeningreso.toLowerCase()
      return item.id_ordeningreso
      .includes(texto);
    });

  }



  
}
