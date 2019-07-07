import { Injectable, isDevMode } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StateService, location } from '../state/state.service';

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

  getLatLng(){
    this.STATE.toggleLocationLoading(true);
    return this.getLocationPromise()
    .then((pos: any) => {
      // return this.STATE.setLatLng(pos.latitude, pos.longitude);
      this.STATE.toggleLocationLoading(false);
      return {lat: pos.latitude, lng: pos.longitude}
    }).catch((err: any) => {
      // TODO: Handle error
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

  addToSavedLocations(){

  }

  // decipherLocationFromInput(locationInput: string){
  //   if(isDevMode()){
  //     console.log("Skipping geolocation in dev mode")
  //     let locationDetails: location = {
  //       type: 'LAT_LNG',
  //       displayName: 'Current Location',
  //       latitude: undefined,
  //       longitude: undefined,
  //       city: 'DevMode',
  //       state: 'DevMode',
  //       country: 'DevMode'
  //     }
  //     this.STATE.toggleLocationLoading(false);
  //     return this.STATE.setLocation(locationDetails);
  //   } else if (locationInput.trim().toLowerCase().includes("current location")){
  //     console.log("Input is 'Current Location'")
  //     return this.getLatLng()
  //     .then((coords: any) => {
  //       let locationDetails: location = {
  //         type: 'LAT_LNG',
  //         displayName: 'Current Location',
  //         latitude: coords.lat,
  //         longitude: coords.lng,
  //         city: undefined,
  //         state: undefined,
  //         country: undefined
  //       }
  //       return this.STATE.setLocation(locationDetails);
  //     }).catch(err => {
  //       // TODO: handle error
  //       console.error(err)
  //     })
  //   } else {
  //     return console.log("Input is a 'City, State, Country'")
  //   }
  // }
  decipherLocationFromInput(locationInput: string): Promise<location> {
    return new Promise((resolve, reject)=>{
      if (locationInput.trim().toLowerCase().includes("current location")){
        console.log("Input is 'Current Location'")
        this.getLatLng()
        .then((coords: any) => {
          let locationDetails: location = {
            type: 'LAT_LNG',
            displayName: 'Current Location',
            latitude: coords.lat,
            longitude: coords.lng,
            city: undefined,
            state: undefined,
            country: undefined
          }
          resolve(locationDetails);
        }).catch(err => {
          console.error(err);
          reject(err);
        })
      } else {
        console.log("Input is a 'City, State, Country'");
        if(!this.stringIncludesCommas(locationInput)){
          // TODO: handle error with snackbar
          console.error("Input must be comma separated City, State, Country")
          reject("Input must be comma separated City, State, Country");
        }
        let parsedInput = locationInput.split(',').map(e => e.trim().toLowerCase());
        let locationDetails: location = {
          type: 'CITY_STATE_COUNTRY',
          displayName: locationInput,
          latitude: undefined,
          longitude: undefined,
          city: parsedInput[0],
          state: parsedInput[1],
          country: parsedInput[2]
        }
        // TODO: handle error
        resolve(locationDetails)
      }
    })
  }

  stringIncludesCommas(str: string): boolean{
    return str.includes(',');
  }



}
