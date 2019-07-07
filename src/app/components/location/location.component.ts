import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { StateService, location } from '../../state/state.service';
import {FormControl} from '@angular/forms';
import { combineLatest } from 'rxjs';
import { skip, filter } from 'rxjs/operators';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor(
    private STATE: StateService,
    private locationSvc: LocationService
  ) { }

  currentLocationSaved: boolean = false;
  locationInput: string;
  locationLoading: boolean;
  savedLocations: location[];
  displayName: string;
  // TODO: Handle current location click in menu

  isLocationSaved(name: string): boolean {
    if(this.savedLocations.filter((loc) => loc.displayName === name).length > 0){
      console.log("This location is already saved.")
      return true;
    } else if (name.trim().toLowerCase() === "current location"){
      console.log("This location is already saved.")
      return true;
    }
    return false;
  }

  locationData$ = combineLatest(
    this.STATE.location$.pipe(filter(location => typeof location.type === 'string')),
    this.STATE.userPrefs$    
  )

  cityClick(e, t){
    console.log("CITY CLICK!", e, t);
    event.stopPropagation();
    this.STATE.setLocation(t);
    // TODO: close menu on click
  }
  deleteClick(e, t){
    console.log("DELETE CLICK!", e, t);
    event.stopPropagation();
  }

  handleLocationInput(){
    console.log(this.displayName);
    this.STATE.toggleTimesLoading(true);
    this.locationSvc.decipherLocationFromInput(this.displayName).then(loc => {
      this.STATE.setLocation(loc);
      console.log("Deciphered new location as: ", loc)
    })
  }

  handleAddLocationClick(){
    this.locationSvc.decipherLocationFromInput(this.displayName).then(loc => {
      return this.STATE.saveLocationToList(loc);
    }) 
  }

  ngOnInit() {
    this.locationData$.subscribe(([loc, settings]) => {
      this.savedLocations = settings.savedLocations;
      this.displayName = loc.displayName
      this.currentLocationSaved = this.isLocationSaved(this.displayName);
      console.log("savedLocations: ", this.savedLocations)
      console.log("Display name is: ", this.displayName)
    })

    this.STATE.ui$.subscribe(
      ui => {
        this.locationLoading = ui.locationLoading;
      }
    )

  }

}
