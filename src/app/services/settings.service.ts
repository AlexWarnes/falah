import { Injectable } from '@angular/core';
import { StateService } from '../state/state.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private STATE: StateService
  ) { }

  getUserSettings(){
    // TODO: check cache for user settings
    // then STATE.setUserSettings()
    // catch STATE.useDefaultSettings()
    console.log("Getting User Settings...")
    this.STATE.useDefaultSettings()
  }

  getUserPrefs(){
    // TODO: check cache for user prefs
    // then STATE.setPrefs(prefs)
    // catch STATE.useDefaultPrefs()
    console.log("Getting Preferences...")
    this.STATE.useDefaultPrefs();
  }

}
