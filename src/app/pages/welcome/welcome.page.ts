import { Component, OnInit, ViewChild } from '@angular/core';
import { UiServiceService } from '../../services/ui-service.service';
import { MenuController } from '@ionic/angular';
// import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    slideShadows: true,
    autoplay: true,
    speed: 700,
  }

  // @ViewChild('slidePrincipal', {static: true}) slides: any;


  // options: AnimationOptions = {
  //   path: 'assets/lottie/welcome.json'
  // }

  // options1: AnimationOptions = {
  //   path: 'assets/lottie/classroom.json'
  // }

  // options2: AnimationOptions = {
  //   path: 'assets/lottie/happy.json'
  // }

  public ultimo: boolean = false;

  constructor(public uiService: UiServiceService,
    public menu: MenuController,
    // private androidPermissions: AndroidPermissions
    ) {
      // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      //   result => console.log('Has permission?',result.hasPermission),
      //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
      // );
      
      // this.androidPermissions.requestPermissions([
      //     this.androidPermissions.PERMISSION.CAMERA, 
      //     this.androidPermissions.PERMISSION.MICROPHONE,
      //     this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS,
      //     this.androidPermissions.PERMISSION.RECORD_AUDIO,
      //     this.androidPermissions.PERMISSION.ACCESS_NETWORK_STATE,
      //     this.androidPermissions.PERMISSION.ACCESS_WIFI_STATE,
      //   ]);
     }

  ngOnInit() {
    this.uiService.lockSideMenu();
  }


  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }

}
