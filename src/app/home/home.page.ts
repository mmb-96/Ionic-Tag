import { Component } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GoogleCloudVisionServiceService } from '../google-cloud-vision-service.service';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  selectedfeature: 'LABEL_DETECTION';

  constructor(private camera: Camera,
              private vision: GoogleCloudVisionServiceService,
              private route: Router,
              public loadingController: LoadingController,
              public alertController: AlertController ) {}

  radioGroupChange(event) {
    this.selectedfeature = event.detail;
  }

  async takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      // correctOrientation: true
    };
    this.camera.getPicture(options).then(async (imageData) => {
      const loading = await this.loadingController.create({
        message: 'Obteniendo resultados ...',
        translucent: true
      });
      await loading.present();
      this.vision.getLabels(imageData, this.selectedfeature).subscribe(async (result) => {
        console.log(JSON.parse(JSON.stringify(result)) + ' error 1');
        const navigationExtras: NavigationExtras = {
          queryParams: {
            special: JSON.stringify(imageData),
            result: JSON.parse(JSON.stringify(result)),
            feature: JSON.stringify(this.selectedfeature)
          }};
        this.route.navigate(['showclass'], navigationExtras);
        await loading.dismiss();
      }, err => {
          console.log(err + ' error 2' );
      });
    }, err => {
      console.log(err + ' error 3');
    });
  }

  async selectPhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    };
    this.camera.getPicture(options).then(async (imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      const loading = await this.loadingController.create({
        message: 'Obteniendo resultados ...',
        translucent: true
      });
      await loading.present();
      this.vision.getLabels(imageData, this.selectedfeature).subscribe(async (result) => {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            special: JSON.stringify(imageData),
            result,
            feature : JSON.stringify(this.selectedfeature)
          }
        };
        this.route.navigate(['showclass'], navigationExtras);
        await loading.dismiss();
      }, err => {
        console.log(err);
      });
    }, (err) => {
      console.log(err);
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Selecciona una opción: ',
      message: '¡Tomar foto o seleccionar de la galería!',
      buttons: [{
        text: 'Camara',
        role: 'camera',
        handler: () => {
          this.takePhoto();
        }
      }, {
        text: 'Galeria',
        role: 'gallary',
        handler: () => {
          this.selectPhoto();
        }
      }]
    });
    await alert.present();
  }
}
