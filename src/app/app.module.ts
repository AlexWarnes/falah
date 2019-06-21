import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimesTableDayComponent } from './components/times-table-day/times-table-day.component';
import { PrayerTimesViewComponent } from './components/prayer-times-view/prayer-times-view.component';
import { SettingsViewComponent } from './components/settings-view/settings-view.component';
import { LocationComponent } from './components/location/location.component';
import { SettingsMenuComponent } from './components/settings-menu/settings-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    TimesTableDayComponent,
    PrayerTimesViewComponent,
    SettingsViewComponent,
    LocationComponent,
    SettingsMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
