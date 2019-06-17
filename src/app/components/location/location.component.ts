import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { StateService } from '../../state/state.service';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor(
    private STATE: StateService,
  ) { }

  locationLoading: boolean;
  ui = this.STATE.ui$.subscribe(
    ui => {
      this.locationLoading = ui.locationLoading;
    }
  )

  latitude: number;
  longitude: number;
  location = this.STATE.location$.subscribe(
    location => {
      this.latitude = location.latitude;
      this.longitude = location.longitude;
    }
  )

  ngOnInit() {
  }

}
