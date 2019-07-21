import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule }    from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// MATERIAL MODULES
import {MatButtonModule, MatSlideToggleModule, MatSelectModule, MatProgressSpinnerModule, MatMenuModule, MatFormFieldModule, MatInputModule} from '@angular/material';

// COMPONENTS
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimesTableDayComponent } from './components/times-table-day/times-table-day.component';
import { PrayerTimesViewComponent } from './components/prayer-times-view/prayer-times-view.component';
import { SettingsViewComponent } from './components/settings-view/settings-view.component';
import { LocationComponent } from './components/location/location.component';
import { SettingsMenuComponent } from './components/settings-menu/settings-menu.component';
import { ClockComponent } from './components/clock/clock.component';

@NgModule({
  declarations: [
    AppComponent,
    TimesTableDayComponent,
    PrayerTimesViewComponent,
    SettingsViewComponent,
    LocationComponent,
    SettingsMenuComponent,
    ClockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatFormFieldModule, MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
