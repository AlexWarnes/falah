import { Component, OnInit } from '@angular/core';
import { LocationService } from './services/location.service';
import { StateService, location } from './state/state.service';
import { PrayerTimesApiService } from './services/prayer-times-api.service';
import { SettingsService } from './services/settings.service';
import { combineLatest } from 'rxjs';
import { skip, filter } from 'rxjs/operators';

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
    // Only emit if we have a valid location type to avoid
    // emiting before location is set on app load
    this.STATE.location$.pipe(filter(location => typeof location.type === 'string')),
    this.STATE.calculationPrefs$,
  );

  ngOnInit(){

    this.settingsSvc.getUserPrefs()
    // TODO: .subscribe({ 
      // next: (res)=> {
        // if(res has userSettings){
        //   let loc = this.location.decipherLocationFromInput(res.defaultLocation)
        //   this.STATE.setLocation(loc);
        //   this.STATE.setUserPrefs(res);
        // } else {
        //   this.STATE.useDefaultUserPrefs();
        this.STATE.useDefaultUserPrefs() //PLACEHOLDER
        this.locationSvc.decipherLocationFromInput('current location').then(loc => { //PLACEHOLDER
          this.STATE.setLocation(loc); //PLACEHOLDER
        }); //PLACEHOLDER
        // }
      // }
    // })
    

    this.settingsSvc.getCalculationPrefs()
    // TODO: .subscribe({ 
      // next: (res)=> {
        // if(res has userPrefs){
        //   return this.STATE.setCalcPrefs(res);
        // } else {
          this.STATE.useDefaultCalcPrefs(); //PLACEHOLDER
        // }
      // }
    // })

    // Update the displayed Prayer Times whenever location$ or preferences$ change
    this.prayerTimesPayload$.subscribe({
      next: ([loc, calcPrefs]) => {
        console.log("Sending PT payload with: ", loc, calcPrefs)
        let today: number = Math.floor(Date.now() / 1000);
        this.prayerTimesSvc.getPrayerTimes(today, loc, calcPrefs);
      },
      error: (err) => {
        console.error(err);
      }
    })

  }

}
