import { Component, OnInit, ApplicationRef, AfterViewChecked, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { interval } from '../../../../node_modules/rxjs';
import { first, tap, switchMap } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  constructor(
    private applicationRef: ApplicationRef,
    private utilities: UtilitiesService,
    private changeDetector: ChangeDetectorRef
  ) { }

  hour: string;
  min: string;
  sec: string;
  suffix: string;

  tick$ = interval(1000);

  ngOnInit() {
    this.tick();
    this.applicationRef.isStable.pipe(
      first(stable => stable),
      tap(stable => console.log('%c App is Now stable: ', 'background: seagreen; padding: 4px; color: #ffffff; font-weight: 600;')),
      switchMap((s)=>interval(1000))
    ).subscribe((s)=> {
      console.log('clock is ticking')
      this.tick()
      this.changeDetector.detectChanges()
    })
  }

  tick(){
    let now = new Date();
    this.hour = String(this.utilities.format12Hour(now.getHours()));
    this.min = `:${String(this.utilities.addZeros(now.getMinutes()))}`;
    this.sec = `:${String(this.utilities.addZeros(now.getSeconds()))}`;
    this.suffix = this.utilities.formatAmPm(this.hour);
  }

}
