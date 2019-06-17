import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrayerTimesViewComponent } from './components/prayer-times-view/prayer-times-view.component';
import { SettingsViewComponent } from './components/settings-view/settings-view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: PrayerTimesViewComponent },
  { path: 'settings', component: SettingsViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
