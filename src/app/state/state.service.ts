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
  savedLocations: Array<location>;
  defaultLocation: string;
  defaultCountry: string;
}

export interface ui {
  appLoading: boolean;
  timesLoading: boolean;
  locationLoading: boolean;
}

export interface loadingStatus {
  userPrefs: true;
  geoLocation: true;
  prayerTimes: true;
}

export interface NextEvent {
  name: string;
  time: string;
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
  prayerTimes$: Observable<prayerTimes> = this.prayerTimes.asObservable();
  
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
    savedLocations: [],
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

  private nextEvent_ = new BehaviorSubject<NextEvent>(undefined);
  public nextEvent$ = this.nextEvent_.asObservable();

  setLatLng(lat: number, lng: number): void {
    let previousState = this.location.value;
    let nextState = Object.assign({}, previousState, {
      ...previousState,
      latitude: lat,
      longitude: lng
    });
    this.logStateChange("setLatLng", previousState, nextState);
    return this.location.next(nextState);
  }

  setLocation(locationObj: location){
    let previousState = this.location.value;
    let nextState = Object.assign({}, previousState, {
      ...locationObj
    });
    this.logStateChange("setLocation", previousState, nextState);
    return this.location.next(nextState);
  }

  toggleAppLoading(isLoading: boolean): void {
    let previousState = this.ui.value;
    let nextState = Object.assign({}, previousState, {
      ...previousState,
      appLoading: isLoading
    });
    this.logStateChange("toggleAppLoading", previousState, nextState);
    return this.ui.next(nextState);
  }
  toggleTimesLoading(isLoading: boolean): void {
    let previousState = this.ui.value;
    let nextState = Object.assign({}, previousState, {
      ...previousState,
      timesLoading: isLoading
    });
    this.logStateChange("toggleTimesLoading", previousState, nextState);
    return this.ui.next(nextState);
  }
  toggleLocationLoading(isLoading: boolean): void {
    let previousState = this.ui.value;
    let nextState = Object.assign({}, previousState, {
      ...previousState,
      locationLoading: isLoading
    });
    this.logStateChange("toggleLocationLoading", previousState, nextState);
    return this.ui.next(nextState);
  }

  setPrayerTimes(prayerTimes: prayerTimes){
    let previousState = this.prayerTimes.value;
    let nextState = Object.assign({}, previousState, {
      ...prayerTimes
    });
    this.logStateChange("setPrayerTimes", previousState, nextState);
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
    this.logStateChange("setCalculationPrefs", previousState, nextState);
    return this.calculationPrefs.next(nextState);
  }

  useDefaultCalcPrefs(){
    let previousState = this.calculationPrefs.value;
    let nextState = Object.assign({}, previousState, {
      ...previousState
    });
    console.log("Using default calcPrefs")
    this.logStateChange("useDefaultCalcPrefs", previousState, nextState);
    return this.calculationPrefs.next(nextState);
  }

  useDefaultUserPrefs(){
    let previousState = this.userPrefs.value;
    let nextState = Object.assign({}, previousState, {
      ...previousState
    });
    console.log("Using default userPrefs")
    this.logStateChange("useDefaultUserPrefs", previousState, nextState);
    return this.userPrefs.next(nextState);
  }

  saveLocationToList(newLocation: location){
    let previousState = this.userPrefs.value;
    let nextState = Object.assign({}, previousState, {
      ...previousState,
      savedLocations: [...previousState.savedLocations, newLocation]
    });
    this.logStateChange("saveLocationToList", previousState, nextState);
    return this.userPrefs.next(nextState);
  }

  removeLocationFromList(displayName: string){
    let prevState = this.userPrefs.value;
    let updatedLocList = prevState.savedLocations.filter(loc => {
      return loc.displayName !== displayName;
    });
    let nextState = Object.assign({}, prevState, {
      savedLocations: [...updatedLocList]
    });
    this.logStateChange("removeLocationFromList", prevState, nextState);
    return this.userPrefs.next(nextState)
  }

  setNextEvent(event: NextEvent){
    let previousState = this.nextEvent_.value;
    let nextState = Object.assign({}, previousState, {
      ...event
    });
    this.logStateChange("setNextEvent", previousState, nextState);
    return this.nextEvent_.next(nextState);
  }





  logStateChange(label, prevState, nextState){
    console.log("%c" + label.toUpperCase(), "color: #333333; width: 100%; font-weight: 600; padding: 3px; background-color: #ffffff;");
    console.log("%c PREVIOUS STATE: ","color: royalblue; font-weight: 600;", prevState);
    console.log("%c NEXT STATE: ","color: seagreen; font-weight: 600;", nextState);
  }

}
