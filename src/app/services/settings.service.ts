import { Injectable } from '@angular/core';
import { StateService } from '../state/state.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private STATE: StateService
  ) { }

  getUserPrefs(){
    // TODO: check cache for user prefs
    // then STATE.setPrefs(prefs)
    // catch STATE.useDefaultPrefs()
    this.STATE.useDefaultPrefs();
  }

}
