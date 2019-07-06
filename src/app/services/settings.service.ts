import { Injectable } from '@angular/core';
import { StateService } from '../state/state.service';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private STATE: StateService
  ) { }

  getUserPrefs(): void{
    // TODO: check cache for user settings
    // then STATE.setUserSettings()
    // catch STATE.useDefaultSettings()
    console.log("Getting user prefs from cache...")
  }

  getCalculationPrefs(){
    // TODO: check cache for user prefs
    // then STATE.setPrefs(prefs)
    // catch STATE.useDefaultPrefs()
    console.log("Getting calc prefs from cache...")
  }

}
