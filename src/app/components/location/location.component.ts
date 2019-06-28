import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { StateService } from '../../state/state.service';
import {FormControl} from '@angular/forms';
import { combineLatest } from '../../../../node_modules/rxjs';
import { skip } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor(
    private STATE: StateService,
  ) { }

  currentLocationNotSaved: boolean = false;

  locationLoading: boolean;
  ui = this.STATE.ui$.subscribe(
    ui => {
      this.locationLoading = ui.locationLoading;
    }
  )

  savedLocations: string[];
  latitude: number;
  longitude: number;
  location = this.STATE.location$.subscribe(
    location => {
      this.latitude = location.latitude;
      this.longitude = location.longitude;
    }
  )

  locationData$ = combineLatest(
    // this.STATE.preferences$.pipe(skip(1))
    this.STATE.preferences$
  )

  log(e, t){
    console.log(e, t)
  }

  ngOnInit() {
    // need to know savedLocations, fill the menu
    // need to know if autoDetectLocation t/f
    // // if true, need to display "current location"
    this.locationData$.subscribe(([data]) => {
      this.savedLocations = data.savedLocations
    })

  }

}
