import { Component } from '@angular/core';
import { PrayerTimesApiService } from './services/prayer-times-api.service';
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private location: LocationService
  ){

  }
  title = 'falah';

  getLocation(){
    console.log('Where are you?')
    this.location.getLocation()
  }
}
