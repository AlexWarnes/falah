import { Component, OnInit } from '@angular/core';
import { LocationService } from './services/location.service';
import { StateService, location } from './state/state.service';
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

  prayerTimesPayload$ = combineLatest(
    this.STATE.location$.pipe(skip(1)),
    this.STATE.preferences$.pipe(skip(1))
  );

  initialSettings$ = combineLatest(
    this.STATE.userSettings$.pipe(skip(1))
  );

  ngOnInit(){

    // Get user settings for default location
    this.initialSettings$.subscribe(([settings]) => {
      console.log("Got the initial settings: ", settings)
      // Then use default location to update location$ state
      this.locationSvc.decipherLocationFromInput(settings.defaultLocation)
      .then(locationData => {
        this.STATE.setLocation(locationData);
      }).catch(err => {
        console.error(err);
      })
      // TODO: Need to stop subscription after the initial settings load 
      // otherwise any change to default location will recalc prayer times
      // Consider just calling getUserSettings from cache, and always setting location 
      // with the response. Then no need to do any of this logic in app onInit
    })

    // Update the displayed Prayer Times whenever location$ or preferences$ change
    this.prayerTimesPayload$.subscribe({
      next: ([loc, prefs]) => {
        console.log("Sending PT payload with: ", loc, prefs)
        let today: number = Math.floor(Date.now() / 1000);
        this.prayerTimesSvc.getPrayerTimes(today, loc, prefs);
      },
      error: (err) => {
        console.error(err);
      }
    })

    // After subscriptions are in place, get the info needed
    this.settingsSvc.getUserSettings();
    this.settingsSvc.getUserPrefs();
  }

}
