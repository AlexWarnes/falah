import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StateService, calculationPrefs, location } from '../state/state.service';
import mockData from '../state/mockTimes.json';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrayerTimesApiService {

  isDevMode = isDevMode();
  apiBaseURL: string = this.isDevMode ? '../state/mockTimes.json' : 'https://api.aladhan.com/v1'

  // isDevMode = false;
  // apiBaseURL: string = 'https://api.aladhan.com/v1'

  constructor(
    private http: HttpClient,
    private STATE: StateService
  ) { }

  getPrayerTimes(date: any, locationObj: location, prefsObj: calculationPrefs){
    this.STATE.toggleTimesLoading(true);
    // Uses mock data if local
    if(this.isDevMode){
      console.log("Using Mock Data");
      console.log('Date arg is: ' + date)
      this.STATE.setPrayerTimes(mockData.data.timings);
      this.STATE.toggleTimesLoading(false);
      return;
    } else {
      switch(locationObj.type){
        case('LAT_LNG'):
        console.log("Gettings Prayer Times by Lat Lng...")
        let options = {
          latitude: locationObj.latitude,
          longitude: locationObj.longitude,
          method: prefsObj.calcMethod,
          school: prefsObj.school,
          midnightMode: prefsObj.midnightMode
        }
        this.getPrayerTimesByLatLng(date, options).subscribe(
          (res) => {
            console.log(res);
            this.STATE.setPrayerTimes(res.data.timings);
            this.STATE.toggleTimesLoading(false);
          },
          (err) => {
            console.error(err)
            this.STATE.toggleTimesLoading(false);
            // TODO: add error handling
          }
        )
        case('CITY_STATE_COUNTRY'):
        return console.log("Gettings Prayer Times by City, State, Country")

        default:
          // TODO: handle error
          console.error('Error with getting prayer times.')
      }
      
    }
  }

  /**
   * @param date unix: number or DD/MM/YYY: string; API defaults to current day
   * @param argsObj populates query params
   */
  private getPrayerTimesByLatLng(date: any, argsObj: object): Observable<any>{
    let params = new HttpParams();
    
    // Add all options as params
    Object.keys(argsObj).forEach(arg => {
      params = params.set(arg, argsObj[arg])
    });

    return this.http.get(`${this.apiBaseURL}/timings`, {params});
    // return this.http.get(`${this.apiBaseURL}/timings/${date}`, {params});
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