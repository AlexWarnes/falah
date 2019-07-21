import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { StateService, location } from '../../state/state.service';
import {FormControl} from '@angular/forms';
import { combineLatest } from 'rxjs';
import { skip, filter } from 'rxjs/operators';
import {MatMenuTrigger} from '@angular/material/menu';


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

  @ViewChild(MatMenuTrigger, {static: false}) trigger: MatMenuTrigger;

  currentLocationSaved: boolean = true;
  locationInput: string;
  locationLoading: boolean;
  savedLocations: location[];
  currentLocationRef: string;
  displayName: string;
  // TODO: display selected location if input is empty

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

  cityClick(t){
    event.stopPropagation();
    this.STATE.setLocation(t);
    this.trigger.closeMenu();
  }
  deleteClick(t){
    event.stopPropagation();
    this.STATE.removeLocationFromList(t.displayName);
    this.trigger.closeMenu();
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

  useCurrentLocation(){
    this.locationSvc.decipherLocationFromInput('current location').then(loc => {
      this.STATE.setLocation(loc);
    });
  }

  handleBlur(){
    this.displayName = this.currentLocationRef;
  }

  ngOnInit() {
    this.locationData$.subscribe(([loc, settings]) => {
      this.savedLocations = settings.savedLocations;
      this.currentLocationRef = loc.displayName
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
