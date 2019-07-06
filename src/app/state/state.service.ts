import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface prayerTimes {
  Asr: string;
  Dhuhr: string;
  Fajr: string;
  Imsak: string;
  Isha: string;
  Maghrib: string;
  Midnight: string;
  Sunrise: string;
  Sunset: string;
}

export interface location {
  type: string;
  displayName: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  country: string;
}

export interface calculationPrefs {
  autoDetectLocation: boolean;
  calcMethod: number;
  school: number;
  midnightMode: number;
  
}

export interface usePrefs {
  notifications: boolean;
  savedLocations: Array<string>;
  defaultLocation: string;
  defaultCountry: string;
}

export interface ui {
  appLoading: boolean;
  timesLoading: boolean;
  locationLoading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  // TODO: make all BS private and add another public asObservable like this:
  private prayerTimes = new BehaviorSubject<prayerTimes>({
    Asr: undefined,
    Dhuhr: undefined,
    Fajr: undefined,
    Imsak: undefined,
    Isha: undefined,
    Maghrib: undefined,
    Midnight: undefined,
    Sunrise: undefined,
    Sunset: undefined
  })
  prayerTimes$ = this.prayerTimes.asObservable();
  
  private location = new BehaviorSubject<location>({
    type: undefined,
    displayName: undefined,
    latitude: undefined,
    longitude: undefined,
    city: undefined,
    state: undefined,
    country: undefined
  })
  location$ = this.location.asObservable();

  private calculationPrefs = new BehaviorSubject<calculationPrefs>({
    autoDetectLocation: true,
    calcMethod: 2,
    school: 0,
    midnightMode: 0,
  })
  calculationPrefs$ = this.calculationPrefs.asObservable();

  private userPrefs = new BehaviorSubject<usePrefs>({
    notifications: false,
    savedLocations: ['Alexandria, VA','Madison, WI','Grand Rapids, MI'],
    defaultLocation: 'current location',
    defaultCountry: 'US'
  })
  userPrefs$ = this.userPrefs.asObservable();

  private ui = new BehaviorSubject<ui>({
    appLoading: true,
    timesLoading: true,
    locationLoading: true,
  })
  ui$ = this.ui.asObservable();

  setLatLng(lat: number, lng: number): void {
    let previousState = this.location.value;
    let nextState = Object.assign({}, previousState, {
      ...previousState,
      latitude: lat,
      longitude: lng
    });
    return this.location.next(nextState);
  }

  setLocation(locationObj: location){
    let previousState = this.location.value;
    let nextState = Object.assign({}, previousState, {
      ...locationObj
    });
    return this.location.next(nextState);
  }

  toggleAppLoading(isLoading: boolean): void {
    let previousState = this.ui.value;
    let nextState = Object.assign({}, previousState, {
      ...previousState,
      appLoading: isLoading
    });
    return this.ui.next(nextState);
  }
  toggleTimesLoading(isLoading: boolean): void {
    let previousState = this.ui.value;
    let nextState = Object.assign({}, previousState, {
      ...previousState,
      timesLoading: isLoading
    });
    return this.ui.next(nextState);
  }
  toggleLocationLoading(isLoading: boolean): void {
    let previousState = this.ui.value;
    let nextState = Object.assign({}, previousState, {
      ...previousState,
      locationLoading: isLoading
    });
    return this.ui.next(nextState);
  }

  setPrayerTimes(prayerTimes: prayerTimes){
    let previousState = this.prayerTimes.value;
    let nextState = Object.assign({}, previousState, {
      ...prayerTimes
    });
    return this.prayerTimes.next(nextState);
  }

  getCalculationPrefs(){
    return this.calculationPrefs.value;
  }

  setCalculationPrefs(prefs: calculationPrefs){
    let previousState = this.calculationPrefs.value;
    let nextState = Object.assign({}, previousState, {
      ...prefs
    });
    return this.calculationPrefs.next(nextState);
  }

  useDefaultCalcPrefs(){
    let previousState = this.calculationPrefs.value;
    let nextState = Object.assign({}, previousState, {
      ...previousState
    });
    console.log("Using default calcPrefs")
    return this.calculationPrefs.next(nextState);
  }

  useDefaultUserPrefs(){
    let previousState = this.userPrefs.value;
    let nextState = Object.assign({}, previousState, {
      ...previousState
    });
    console.log("Using default userPrefs")
    return this.userPrefs.next(nextState);
  }

}
