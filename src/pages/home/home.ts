import { Component,NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  	BackgroundGeolocation,
  	BackgroundGeolocationConfig,
  	BackgroundGeolocationResponse,
  	BackgroundGeolocationEvents
} from "@ionic-native/background-geolocation";

@Component({
  	selector: 'page-home',
  	templateUrl: 'home.html'
})
export class HomePage {
   
  	public lat: number = 0;
  	public lng: number = 0;

  	constructor(
  		public navCtrl: NavController,
  		public zone: NgZone,
  		private backgroundGeolocation: BackgroundGeolocation
	){

  	}

  	start() {
    	const config: BackgroundGeolocationConfig = {
      		desiredAccuracy: 10,
      		stationaryRadius: 20,
      		distanceFilter: 30,
      		debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      		stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      		interval: 3000,
		    fastestInterval: 2500,
		    notificationTitle: "LOCATIONTEST", // Android
		    notificationText: "Background location tracking is ON.", // Android
		    notificationIconLarge: "icon", // Android
		    notificationIconSmall: "icon", // Android
		    startOnBoot: true,
		    startForeground: true,
		   	activityType: 'AutomotiveNavigation',
    	};

    	this.backgroundGeolocation.configure(config).then(() => {
      		this.backgroundGeolocation
    		.on(BackgroundGeolocationEvents.location)
    		.subscribe((location: BackgroundGeolocationResponse) => {
      			this.zone.run(() => {
			        this.lat = location.latitude;
			        this.lng = location.longitude;
			    });
    		}, 
    		(err) => {
      			console.log(err);
    		});
    	});
    	this.backgroundGeolocation.start();
  	}

  	stop() {
  		this.backgroundGeolocation.stop();
  	}
}
