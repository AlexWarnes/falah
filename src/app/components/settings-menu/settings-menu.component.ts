import { Component, OnInit, OnDestroy } from '@angular/core';
import { preferences, StateService } from '../../state/state.service';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.css']
})
export class SettingsMenuComponent implements OnDestroy {

  constructor(
    private STATE: StateService
  ) { }

  dynamicSettings: preferences;
  settingsSub: Subscription = this.STATE.preferences$.subscribe(prefs => {
    this.dynamicSettings = {...prefs};
  });

  calcMethods: Array<any> = [
    {name: 'Shia Ithna-Ansari', value: 0},
    {name: 'University of Islamic Sciences, Karachi', value: 1},
    {name: 'Islamic Society of North America', value: 2},
    {name: 'Muslim World League', value: 3},
    {name: 'Umm Al-Qura University, Makkah', value: 4},
    {name: 'Egyptian General Authority of Survey', value: 5},
    {name: 'Institute of Geophysics, University of Tehran', value: 7},
    {name: 'Gulf Region', value: 8},
    {name: 'Kuwait', value: 9},
    {name: 'Qatar', value: 10},
    {name: 'Majlis Ugama Islam Singapura, Singapore', value: 11},
    {name: 'Union Organization islamic de France', value: 12},
    {name: 'Diyanet İşleri Başkanlığı, Turkey', value: 13},
    {name: 'Spiritual Administration of Muslims of Russia', value: 14},
  ]

  schools: Array<any> = [
    {name: 'Shafi', value: 0},
    {name: 'Hanafi', value: 1}
  ]

  midnightModes: Array<any> = [
    {name: 'Standard', value: 0},
    {name: 'Jafari', value: 0}
  ]

  updateToggled(e){
    this.dynamicSettings.autoDetectLocation = e.checked;
  }

  updateSelected(e){
    let key = e.source._id;
    let value = e.value;
    this.dynamicSettings = Object.assign({}, this.dynamicSettings, {
      ...this.dynamicSettings,
      [key]: value
    })
    console.log(this.dynamicSettings)
  }

  // Checks if the values in two objects are equal
  objectsAreEqual(obj1: preferences, obj2: preferences): boolean {
    let keys = Object.keys(obj1);
    for(let key of keys){
      if(obj1[key] !== obj2[key]){
        return false;
      }
    }
    return true;
  }

  ngOnDestroy() {
    this.settingsSub.unsubscribe();
    if(this.objectsAreEqual(this.dynamicSettings, this.STATE.preferences$.getValue())){
      return console.log("Settings DID NOT CHANGE", this.dynamicSettings, "STATE: ", this.STATE.preferences$.getValue());
    } else {
      console.log("Settings DID CHANGE", this.dynamicSettings)
      return this.STATE.setUserPrefs(this.dynamicSettings);
    }
  }

}
