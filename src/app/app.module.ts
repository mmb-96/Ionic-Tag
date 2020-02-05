import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { VisionPage } from './vision/vision.page';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { Camera } from '@ionic-native/camera';

const firebaseConfig = {
  apiKey: 'AIzaSyClUaIIUrvNIPKY3B9olaDXrKCTFblskd4',
  authDomain: 'auto-tag-882d3.firebaseapp.com',
  databaseURL: 'https://auto-tag-882d3.firebaseio.com',
  projectId: 'auto-tag-882d3',
  storageBucket: 'auto-tag-882d3.appspot.com',
  messagingSenderId: '883286302400',
  appId: '1:883286302400:web:76288fe507793b94099725',
  measurementId: 'G-FHJJSVL7TS'
};

@NgModule({
  declarations: [AppComponent, VisionPage],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
