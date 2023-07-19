import { Component, OnInit } from '@angular/core';
import { ServiciosAppService } from 'src/app/services/servicios-app.service';
import { UserServiceService } from 'src/app/services/user-service.service';


// import { ChartConfiguration, ChartData, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
// import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { PdfMakeWrapper, QR, Table, Txt, Img  } from 'pdfmake-wrapper';


import { EncuestaComponent } from 'src/app/components/encuesta/encuesta.component';
import { ModalController, Platform } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {

  public id = localStorage.getItem('id');
  public resultado: any = [];


  
  public humedo1: any[] = [7, 5,3,6,9];
  public seco2: any[] = [];
  public fechas: any[] = [];
  public titulo: any[] = [];
  public notas: any[] = [];




  public usuario: any;


  constructor(public servApp: UserServiceService,
    public uiService: UiServiceService,
    public platform: Platform,
    public file: File,
    public fileOpener: FileOpener,
    public userServives: UserServiceService,
    public modalCtrl: ModalController) { }

  ngOnInit() {

    this.cargarResultados();


    this.userServives.getUserDNI(this.id).subscribe(resp => {
      console.log(resp.user);
      
      this.usuario = resp.user;
     
    })


  }



  cargarResultados(){
    this.servApp.obetenerResultadosID(this.id).subscribe( resp => {
      this.resultado = resp['resultado'];


      console.log(resp.resultado);
      this.resultado = resp.resultado;

    })
  }




  async encuenta() {
    const modal = await this.modalCtrl.create({
      component: EncuestaComponent,
      componentProps: {
        // data: data
      },
      // swipeToClose: true,
      animated:true,
      mode:'md',
      cssClass: 'my-custom-modal-niubiz',
  });
  await modal.present();
  }














  async imprimir(){

    const logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAABfCAYAAADxsctBAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAKsdJREFUeF7tnQmcjlX//59o8YssbfTYIiVLpGSNEp5KpbRvohUtD5E1FSo8WUoUIhFlGEt2jbXMWDKMPcY2ZrJmH2Zlrv/nfe773P/bmBlD5XlM5/N6ndd139c519mu8znf7/me5fqHg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg0PmuMJ/dXBwOJ/o1atb67Afp22sWfPmiv5bDg4O54Lnnnu4vlwd/98scc89t5afOjV06OHDBz2wefP6o99880W3kiULXO8PkhXyvPNOy8caNap1q/+/g8PfG40a1S23ZcvG5H37dnuLF/+0fNy4bz/t27dH8w4dmjds9txTd7ds+fQ9vXt3fjIkZGT3RYvmz9uxY1uKYZ5w8KCPhGD79i3Hly8PXzhpwuj+Q4YMavXZZ10e++STd5qMGzfo8bFjh7dfuHDG6A0bVm1JSUnyIiMXb1PSV/py4ODw98XlK1cuW+3n0ClISU704uOPegkJ8fp30nfTjyNHDntr167x1qxZ423ZstlLTk72+wQjTe6E72cGmDFj0ix/Hhwc/p744YeQb/188EJCxnqhoaHejh0x3okTpxMnMTHRi4uL9davX29cfDzE9LydO3d669at83799VcvNjZWhE0w94Nx7Ngx4z9q1Chv4cKF/rue9+WX/Xv6s+Lg8PdC374fvnXiRKohwpQpU7zSpUt7N910k1et2h1e48aNveeff85r1aql9+KLLxpibt68WQSMM2TKCNzHf8uWLV6fPn38cTzvNWnSxGvQoIF36623eqVKldK1ird6tU/oMo5s/ebLT/iz5ODw90DTZx65Ky5uh9Er161b6912223eHXfc4dWtW9e78847vdtvv93cgzTFixf3Pv74Y2///v2GNGfCrl27vLfeesu74YYbzPPVqlUzcdarV8+rX7++V7lyZXPds2ePCR8d/Wt8tWrly/uz5uCQ43HN6tUrY2n8hw4d8u677z6vSpUqXsWKFb1x48Z5kZGRhiSQBlehQgVv0KDPjaqZkpLiHThwwNu3b5+3d+9e8xskJSV5v//+uyEpBHznnXe8W265xatataq3dOlS7+jReC81NdU8/8wzzxhy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'

    var titulo = 'IE RAMIRO PRIALE PRIALE';
    var espacio = '   ';
    const pdf = new PdfMakeWrapper();
    pdf.pageSize('A7');
    pdf.pageMargins([ 8, 8, 10, 10 ]);
    pdf.info({
      title: 'TENIS Reserva - Ticket',
      author: 'laimedeveloper',
      subject: 'ticketReserva',
    });

    pdf.defaultStyle({
      fontSize: 7
    });

    pdf.add( new Txt(espacio).end);
    pdf.add( await new Img(logo).width('70').alignment('center').build() );
    pdf.add( new Txt('---------------------------------------------------------------------------------------------------').alignment('center').italics().end);
    pdf.add( new Txt(`DOCENTE: ${this.usuario.nombre} ${this.usuario.apellidos} `).alignment('center').italics().end);

    pdf.add( new Txt('---------------------------------------------------------------------------------------------------').alignment('center').italics().end);
    pdf.add( new Txt(espacio).end);
    
    pdf.add( new Txt('MIS CALIFICACIONES').alignment('center').italics().end);
    
    pdf.add( new Txt(espacio).end);

    pdf.add( new Txt('---------------------------------------------------------------------------------------------------').alignment('center').italics().end);
    
    pdf.add (new Table([
      [ 'PRUEBA', 'NOTA' ,'FECHA'],
    ]).alignment('left').italics().layout('noBorders').widths([ 68,40,45  ]).end);
    pdf.add( new Txt('---------------------------------------------------------------------------------------------------').alignment('center').italics().end);

    for(let data of this.resultado) {
      pdf.add (new Table([
        [ 
          await  new Txt(`${data.nombrePrueba}`).end,
          await  new Txt(`${data.nota}`).end,
          await  new Txt(`${data.created.slice(0, 10)}`).end
        
        ],
      ]).alignment('left').italics().layout('noBorders').widths([ 68,40,45  ]).end);
    }
    pdf.add( new Txt('---------------------------------------------------------------------------------------------------').alignment('center').italics().end);



  pdf.add( new Txt(espacio).end);
  
    pdf.add(new QR(this.usuario.dni).fit(60).alignment('center').end);
    
  pdf.add( new Txt(espacio).end);
    
    pdf.add( new Txt(espacio).end);
    pdf.add( new Txt('MUCHAS GRACIAS').alignment('center').bold().italics().end);
    pdf.add( new Txt(espacio).end);

    
    pdf.create().download();

    var pdfObject = pdf.create();

    if(this.platform.is('cordova')) {

      pdfObject.getBuffer((buffer) => {
        var blob = new Blob([buffer], {type: 'application/pdf'});
        this.file.writeFile(this.file.dataDirectory,  'micertificado.pdf', blob, { replace: true }).then(fileEntry => {
          this.fileOpener.open(this.file.dataDirectory +  'micertificado.pdf', 'application/pdf');
        });
      });
      return true;
    }
    return true;
  }


}
