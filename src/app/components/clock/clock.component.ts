import { Component, OnInit, ApplicationRef, AfterViewChecked, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { interval } from '../../../../node_modules/rxjs';
import { first, tap, switchMap, filter } from '../../../../node_modules/rxjs/operators';
import { StateService, prayerTimes } from '../../state/state.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  constructor(
    private applicationRef: ApplicationRef,
    private STATE: StateService,
    private utilities: UtilitiesService,
    private changeDetector: ChangeDetectorRef
  ) { }

  hour: string;
  min: string;
  sec: string;
  suffix: string;

  tick$ = interval(1000);

  currentPrayerTimes: prayerTimes;
  nextEvent: any;
  timeToNextEvent: any;

  ngOnInit() {
    this.tick();
    this.applicationRef.isStable.pipe(
      first(stable => stable),
      tap(() => console.log('%c App is Now stable: ', 'background: seagreen; padding: 4px; color: #ffffff; font-weight: 600;')),
      switchMap((s)=>interval(1000))
    ).subscribe((s)=> {
      this.tick()
      this.changeDetector.detectChanges()
    })

    this.STATE.prayerTimes$.pipe(
      filter(pt => pt.Fajr != null)
    ).subscribe(prayerTimes => {
      this.currentPrayerTimes = prayerTimes;
      this.nextEvent = this.utilities.findNextEvent(this.currentPrayerTimes);
      this.timeToNextEvent = this.calcTimeToNextEvent(this.nextEvent.time);
    })
  }

  tick(){
    let now = new Date();
    this.hour = String(this.utilities.format12Hour(now.getHours()));
    let minsChanged = `:${String(this.utilities.addZeros(now.getMinutes()))}` !== this.min ? true : false;
    this.min = `:${String(this.utilities.addZeros(now.getMinutes()))}`;
    this.sec = `:${String(this.utilities.addZeros(now.getSeconds()))}`;
    this.suffix = this.utilities.formatAmPm(now.getHours());

    if(this.currentPrayerTimes && minsChanged ){
      this.nextEvent = this.utilities.findNextEvent(this.currentPrayerTimes);
      console.log(this.nextEvent)
      this.timeToNextEvent = this.calcTimeToNextEvent(this.nextEvent.time);
      console.log(this.timeToNextEvent)
    }
  }

  calcTimeToNextEvent(nextTime){
    let now: any = new Date();
    let nextHours = nextTime.split(':')[0];
    let nextMins = nextTime.split(':')[1];
    let future: any = new Date();
    future = new Date(future.setHours(nextHours));
    future = new Date(future.setMinutes(nextMins));
    
    let minutesDiff = (future - now)/1000/60;
    return {
      hours: minutesDiff > 60 ? Math.floor(minutesDiff/60) : undefined,
      minutes: minutesDiff > 60 ? Math.floor(minutesDiff % 60) : minutesDiff
    }
  }

}
