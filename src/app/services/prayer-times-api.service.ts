import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrayerTimesApiService {

  apiBaseURL: string = 'https://api.aladhan.com/v1'

  constructor(
    private http: HttpClient,
    private params: HttpParams
  ) { }

  /**
   * 
   * @param date unix: number or DD/MM/YYY: string; API defaults to current day
   * @param argsObj object with optional keys: 
      latitude" (decimal) -
      longitude" (decimal) -
      method" (number) -
      tune" (string) -
      school" (number) -
      midnightMode" (number) -
      timezonestring" (string) -
      latitudeAdjustmentMethod" (number) -
      adjustment" (number) -
   */
  getPrayerTimesByDate(date: any, argsObj: object){
    let params = this.params;
    Object.keys(argsObj).forEach(arg => {
      params.append(arg, argsObj[arg])
    })
    return this.http.get(`${this.apiBaseURL}/timings/${date}`)
  }
}

// "method" (number) -
// A prayer times calculation method. Methods identify various schools of thought about how to compute the timings. This parameter accepts values from 0-12 and 99, as specified below:
// 0 - Shia Ithna-Ansari
// 1 - University of Islamic Sciences, Karachi
// 2 - Islamic Society of North America
// 3 - Muslim World League
// 4 - Umm Al-Qura University, Makkah 
// 5 - Egyptian General Authority of Survey
// 7 - Institute of Geophysics, University of Tehran
// 8 - Gulf Region
// 9 - Kuwait
// 10 - Qatar
// 11 - Majlis Ugama Islam Singapura, Singapore
// 12 - Union Organization islamic de France
// 13 - Diyanet İşleri Başkanlığı, Turkey
// 14 - Spiritual Administration of Muslims of Russia
// 99 - Custom. See https://aladhan.com/calculation-methods

// "tune" (string) -
// Comma Separated String of integers to offset timings returned by the API in minutes. Example: 5,3,5,7,9,7. See https://aladhan.com/calculation-methods

// "school" (number) -
// 0 for Shafi (or the standard way), 1 for Hanafi. If you leave this empty, it defaults to Shafii.

// "midnightMode" (number) -
// 0 for Standard (Mid Sunset to Sunrise), 1 for Jafari (Mid Sunset to Fajr). If you leave this empty, it defaults to Standard.

// "timezonestring" (string) -
// A valid timezone name as specified on http://php.net/manual/en/timezones.php . Example: Europe/London. If you do not specify this, we'll calcuate it using the co-ordinates you provide.

// "latitudeAdjustmentMethod" (number) -
// Method for adjusting times higher latitudes - for instance, if you are checking timings in the UK or Sweden.
// 1 - Middle of the Night
// 2 - One Seventh
// 3 - Angle Based

// "adjustment" (number) -
// Number of days to adjust hijri date(s). Example: 1 or 2 or -1 or -2