import { Injectable } from '@angular/core';
import { BehaviorSubject } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  // currentLocation = new BehaviorSubject<object> = {lat: null, lng: null}

  constructor() { }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("GETTING POSITION")
        console.log({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude
        });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  // Enabled ONLY if user approves auto-updating location
  trackLocation(){
      if (navigator.geolocation) {
      //if (navigator.geolocation && settings.trackingApproved) 
        navigator.geolocation.watchPosition((position) => {
          console.log("Tracking position")
          console.log({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude
          });
        });
      } else {
        let error = [];
        if (!navigator.geolocation){
          error.push('Geolocation is not supported by this browser');
        }
        // if (!settings.trackingApproved){
        //   error.push('Auto-detecting location is turned off.')
        // }
        console.error(error.forEach(err => {
          return err;
        }));
      }
    }
  
}
