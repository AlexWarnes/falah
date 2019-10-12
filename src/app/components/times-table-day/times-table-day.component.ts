import { Component, OnInit } from '@angular/core';
import { StateService, prayerTimes } from '../../state/state.service';
import { UtilitiesService } from '../../services/utilities.service';
import { filter } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-times-table-day',
  templateUrl: './times-table-day.component.html',
  styleUrls: ['./times-table-day.component.css']
})
export class TimesTableDayComponent implements OnInit {

  constructor(
    private STATE: StateService,
    private utilities: UtilitiesService
  ) { }

  timesLoading: boolean;
  todayEvents: Array<any>;
  todayTimes: prayerTimes;

  ngOnInit() {
    this.STATE.prayerTimes$.pipe(
      filter(pt => pt.Asr != null)
    ).subscribe(
      times => {
        this.todayEvents = Object.keys(times);
        this.todayTimes = this.formatPrayerTimes(times);
      })

    this.STATE.ui$.subscribe(
      ui => {
        this.timesLoading = ui.timesLoading
      })
  }

  formatPrayerTimes(prayerTimes: any): any{
    let formattedTime = {};
    for(let [key, value] of Object.entries(prayerTimes)){
      formattedTime[key] = this.formatTime(value);
    }
    return formattedTime;
  }

  formatTime(time: any): string {
    const hours = time.split(':')[0]
    const minutes = time.split(':')[1]
    const formatHour = this.utilities.format12Hour(hours);
    return `${formatHour}:${minutes}`
  }

}
