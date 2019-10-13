import { Injectable } from '@angular/core';
import { prayerTimes } from '../state/state.service';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  format12Hour(hours): string{
    let newHour = hours > 12 || String(hours) === "00" ? String(Math.abs(hours - 12)) : this.rmvZeros(hours);
    return newHour;
  }

  formatAmPm(hours): string{
    let suffix = hours < 12 ? 'am' : 'pm';
    return suffix;
  }

  addZeros(num: number): string{
    let result = num < 10 ? `0${num}` : String(num);
    return result;
  }

  rmvZeros(num: string | number): string {
    const stringForce = String(num);
    return stringForce.indexOf('0') === 0 ? stringForce.replace('0','') : stringForce;
  }

  findNextEvent(prayerTimes: prayerTimes){
    let currentHours = new Date().getHours();
    let currentMins = new Date().getMinutes();
    let displayedEvents = ['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha']
    let allFutureEvents = [];
    for(let [event, time] of Object.entries(prayerTimes)){
      const eventHours = Number(time.split(':')[0]);
      const eventMins = Number(time.split(':')[1]);
      if(eventHours > currentHours){
        let futureEvent = {
          name: event,
          time: time
        }
        allFutureEvents = [...allFutureEvents, futureEvent];
      } else if (eventHours === currentHours && eventMins > currentMins){
        let futureEvent = {
          name: event,
          time: time
        }
        allFutureEvents = [...allFutureEvents, futureEvent];
      }
    }

    const sortEarlyToLate = (a,b) => Number(a.time.replace(':','')) > Number(b.time.replace(':','')) ? 1 : -1;
    console.log('Sorted: ', allFutureEvents.sort(sortEarlyToLate))
    const earliestDisplayedEvent = allFutureEvents.sort(sortEarlyToLate).find(entry => {
      return displayedEvents.includes(entry.name)
    })
    return earliestDisplayedEvent;
  }
  
}
