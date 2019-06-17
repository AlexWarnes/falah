import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StateService } from '../state/state.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {


  constructor(
    private STATE: StateService
  ) { }

  // Gets LAT/LNG then updates state or throws error
  getLocation(){
    this.STATE.toggleLocationLoading(true);
    return this.getLocationPromise()
    .then((pos: any) => {
      this.STATE.toggleLocationLoading(false);
      return this.STATE.setLatLng(pos.latitude, pos.longitude);
    }).catch((err: any) => {
      this.STATE.toggleLocationLoading(false);
      return console.error(err)
    })
  }

  private getLocationPromise() {
    return new Promise((resolve, reject) => {
      console.log('In the promise')
      if (navigator.geolocation) {
        console.log('We have geolocation')
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("GETTING POSITION")
          let positionInfo = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude
          };
          resolve(positionInfo)
        });
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    })
  }
  
}
