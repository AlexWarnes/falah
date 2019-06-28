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
  latitude: number;
  longitude: number;
  altitude: number;
  cityState: string;
}

export interface preferences {
  autoDetectLocation: boolean;
  calcMethod: number;
  school: number;
  midnightMode: number;
  notifications: boolean;
  savedLocations: Array<string>;
  // TODO: Default location?
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

  prayerTimes$ = new BehaviorSubject<prayerTimes>({
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
  
  location$ = new BehaviorSubject<location>({
    latitude: undefined,
    longitude: undefined,
    altitude: undefined,
    cityState: undefined,
  })

  preferences$ = new BehaviorSubject<preferences>({
    autoDetectLocation: true,
    calcMethod: 2,
    school: 0,
    midnightMode: 0,
    notifications: false,
    savedLocations: ['Alexandria, VA','Madison, WI','Grand Rapids, MI']
  })

  ui$ = new BehaviorSubject<ui>({
    appLoading: false,
    timesLoading: true,
    locationLoading: true,
  })

  // State management approach for now:
  // setLatLng() saves to cacheAPI or IndexedDB (w Promise Wrapper)
  // // then setLatLngSuccess() updates BehaviorSubject


  setLatLng(lat: number, lng: number): void {
    let previousState = this.location$.value;
    let nextState = Object.assign({}, previousState, {
      ...previousState,
      latitude: lat,
      longitude: lng
    });
    return this.location$.next(nextState);
  }

  toggleAppLoading(isLoading: boolean): void {
    let previousState = this.ui$.value;
    let nextState = Object.assign({}, previousState, {
      ...previousState,
      appLoading: isLoading
    });
    return this.ui$.next(nextState);
  }
  toggleTimesLoading(isLoading: boolean): void {
    let previousState = this.ui$.value;
    let nextState = Object.assign({}, previousState, {
      ...previousState,
      timesLoading: isLoading
    });
    return this.ui$.next(nextState);
  }
  toggleLocationLoading(isLoading: boolean): void {
    let previousState = this.ui$.value;
    let nextState = Object.assign({}, previousState, {
      ...previousState,
      locationLoading: isLoading
    });
    return this.ui$.next(nextState);
  }

  setPrayerTimes(prayerTimes: prayerTimes){
    let previousState = this.prayerTimes$.value;
    let nextState = Object.assign({}, previousState, {
      ...prayerTimes
    });
    return this.prayerTimes$.next(nextState);
  }

  setUserPrefs(prefs: preferences){
    let previousState = this.preferences$.value;
    let nextState = Object.assign({}, previousState, {
      ...prefs
    });
    console.log("prefs: ", prefs);
    console.log("next: ", nextState)
    return this.preferences$.next(nextState);
  }

  useDefaultPrefs(){
    let previousState = this.preferences$.value;
    let nextState = Object.assign({}, previousState, {
      ...previousState
    });
    return this.preferences$.next(nextState);
  }

}
