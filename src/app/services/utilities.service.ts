import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  format12Hour(hours){
    let newHour = hours > 12 ? hours - 12 : hours;
    return newHour;
  }

  formatAmPm(hours){
    let suffix = hours > 12 ? 'am' : 'pm';
    return suffix;
  }

  addZeros(num: number){
    let result = num < 10 ? `0${num}` : num;
    return result;
  }
  
}
