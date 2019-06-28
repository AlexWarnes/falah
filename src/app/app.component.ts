import { Component, OnInit } from '@angular/core';
import { LocationService } from './services/location.service';
import { StateService } from './state/state.service';
import { PrayerTimesApiService } from './services/prayer-times-api.service';
import { SettingsService } from './services/settings.service';
import { combineLatest } from 'rxjs';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private STATE: StateService,
    private locationSvc: LocationService,
    private settingsSvc: SettingsService,
    private prayerTimesSvc: PrayerTimesApiService
  ){}

  // latitude: number;
  // longitude: number;
  // calcMethod: number;
  // school: number;
  appLoading: boolean = true;
  // today: number = Math.floor(Date.now() / 1000);

  appUI = this.STATE.ui$.subscribe(
    ui => {
      this.appLoading = ui.appLoading
    }
  )

  // location = this.STATE.location$.subscribe(
  //   location => {
  //     this.latitude = location.latitude;
  //     this.longitude = location.longitude;
  //   }
  // )

  // userPreferences = this.STATE.preferences$.subscribe(
  //   prefs => {
  //     this.calcMethod = prefs.calcMethod;
  //     this.school = prefs.school;
  //   }
  // )

  prayerTimesPayload$ = combineLatest(
    this.STATE.location$,
    this.STATE.preferences$
  ).pipe(skip(1));

  ngOnInit(){
    this.locationSvc.getLocation();
    this.settingsSvc.getUserPrefs();

    this.prayerTimesPayload$.subscribe({
      next: ([loc, prefs]) => {
        console.log("Sending PT payload with: ", loc, prefs)
        let options = {
          latitude: loc.latitude,
          longitude: loc.longitude,
          method: prefs.calcMethod,
          school: prefs.school,
          midnightMode: prefs.midnightMode
        }
        let today: number = Math.floor(Date.now() / 1000);
      this.prayerTimesSvc.getPrayerTimes(today, options);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  // getLocation(){
  //   return this.locationSvc.getLocation()
  // }

}
