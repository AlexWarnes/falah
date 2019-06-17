import { Component, OnInit } from '@angular/core';
import { StateService, prayerTimes } from '../../state/state.service';

@Component({
  selector: 'app-times-table-day',
  templateUrl: './times-table-day.component.html',
  styleUrls: ['./times-table-day.component.css']
})
export class TimesTableDayComponent implements OnInit {

  constructor(
    private STATE: StateService,
  ) { }

  timesLoading: boolean;
  todayEvents: Array<any>;
  todayTimes: prayerTimes;

  prayerTimes = this.STATE.prayerTimes$.subscribe(
    times => {
      this.todayEvents = Object.keys(times);
      this.todayTimes = times;
    }
  )

  appUI = this.STATE.ui$.subscribe(
    ui => {
      this.timesLoading = ui.timesLoading
    }
  )

  ngOnInit() {
    
  }

}
