import { Component, OnInit } from '@angular/core';
import { StateService, preferences } from '../../state/state.service';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.css']
})
export class SettingsMenuComponent implements OnInit {

  constructor(
    private STATE: StateService
  ) { }

  preferences;

  // autoDetectLocation: boolean;
  // calcMethod: number;
  // school: number;
  // midnightMode: number;
  // notifications: boolean;


  ngOnInit() {
    this.STATE.preferences$.subscribe((prefs) => {
      return this.preferences = {...prefs};
    })
  }

}
