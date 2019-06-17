import { Component, OnInit } from '@angular/core';
import { LocationService } from './services/location.service';
import { StateService } from './state/state.service';
import { PrayerTimesApiService } from './services/prayer-times-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private STATE: StateService,
    private locationSvc: LocationService,
    private prayerTimesSvc: PrayerTimesApiService
  ){}

  title = 'falah';
  latitude: number;
  longitude: number;
  calcMethod: number;
  school: number;
  appLoading: boolean = true;
  today: number = Math.floor(Date.now() / 1000);

  appUI = this.STATE.ui$.subscribe(
    ui => {
      this.appLoading = ui.appLoading
    }
  )

  location = this.STATE.location$.subscribe(
    location => {
      this.latitude = location.latitude;
      this.longitude = location.longitude;
    }
  )

  userPreferences = this.STATE.preferences$.subscribe(
    prefs => {
      this.calcMethod = prefs.calcMethod;
      this.school = prefs.school;
    }
  )

  ngOnInit(){
    return this.getLocation()
    .then(() => {
      let options = {
        latitude: this.latitude,
        longitude: this.longitude,
        method: 2
      }
      this.prayerTimesSvc.getPrayerTimes(this.today, options);
    }).catch((err) => {
      console.error('Error getting your location.', err)
    })
  }

  getLocation(){
    return this.locationSvc.getLocation()
  }

}
