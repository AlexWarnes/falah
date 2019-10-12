import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  format12Hour(hours): string{
    let newHour = hours > 12 ? String(hours - 12) : this.rmvZeros(hours);
    return newHour;
  }

  formatAmPm(hours): string{
    let suffix = hours > 12 ? 'am' : 'pm';
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
  
}
