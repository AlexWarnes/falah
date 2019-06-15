// //--------------------- Copyright Block ----------------------
// /* 

// PrayTimes.js: Prayer Times Calculator (ver 2.3)
// Copyright (C) 2007-2011 PrayTimes.org

// Developer: Hamid Zarrabi-Zadeh
// License: GNU LGPL v3.0

// TERMS OF USE:
// 	Permission is granted to use this code, with or 
// 	without modification, in any website or application 
// 	provided that credit is given to the original work 
// 	with a link back to PrayTimes.org.

// This program is distributed in the hope that it will 
// be useful, but WITHOUT ANY WARRANTY. 

// PLEASE DO NOT REMOVE THIS COPYRIGHT BLOCK.
 
// */ 

// import { Injectable } from '@angular/core';
// import { DegreeBasedMathService } from './degree-based-math.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class PrayerTimesService {

//   //----------------------- Local Variables ---------------------

//   lat
//   lng
//   elv
//   timeZone
//   jDate
//   params

//   // Time Names
//   timeNames = {
//     imsak    : 'Imsak',
//     fajr     : 'Fajr',
//     sunrise  : 'Sunrise',
//     dhuhr    : 'Dhuhr',
//     asr      : 'Asr',
//     sunset   : 'Sunset',
//     maghrib  : 'Maghrib',
//     isha     : 'Isha',
//     midnight : 'Midnight'
//   }


//   // Calculation this.methods
//   methods = {
//     MWL: {
//       name: 'Muslim World League',
//       params: { fajr: 18, isha: 17, maghrib: '0 min', midnight: 'Standard' } }, //has default maghrib & midnight
//     ISNA: {
//       name: 'Islamic Society of North America (ISNA)',
//       params: { fajr: 15, isha: 15, maghrib: '0 min', midnight: 'Standard' } }, //has default maghrib & midnight
//     Egypt: {
//       name: 'Egyptian General Authority of Survey',
//       params: { fajr: 19.5, isha: 17.5, maghrib: '0 min', midnight: 'Standard' } }, //has default maghrib & midnight
//     Makkah: {
//       name: 'Umm Al-Qura University, Makkah',
//       params: { fajr: 18.5, isha: '90 min', maghrib: '0 min', midnight: 'Standard' } }, //has default maghrib & midnight  // fajr was 19 degrees before 1430 hijri
//     Karachi: {
//       name: 'University of Islamic Sciences, Karachi',
//       params: { fajr: 18, isha: 18, maghrib: '0 min', midnight: 'Standard' } }, //has default maghrib & midnight
//     Tehran: {
//       name: 'Institute of Geophysics, University of Tehran',
//       params: { fajr: 17.7, isha: 14, maghrib: 4.5, midnight: 'Jafari' } },  // isha is not explicitly specified in this method
//     Jafari: {
//       name: 'Shia Ithna-Ashari, Leva Institute, Qum',
//       params: { fajr: 16, isha: 14, maghrib: 4, midnight: 'Jafari' } }
//   }


//   // Default Parameters in Calculation Methods
//   defaultParams = {
//     maghrib: '0 min', midnight: 'Standard'
//   }

//   //---------------------- Default Settings --------------------
    
//   calcMethod = 'MWL'

//   // do not change anything here; use adjust method instead
//   setting = {  
//     imsak    : '10 min',
//     dhuhr    : '0 min',  
//     asr      : 'Standard',
//     highLats : 'NightMiddle'
//   }

//   timeFormat = '24h'
//   timeSuffixes = ['am', 'pm']
//   invalidTime =  '-----'

//   numIterations = 1
//   offset = {}

//   constructor(
//     public dMath: DegreeBasedMathService
//   ) { 
//     // set methods defaults
//     let defParams = this.defaultParams;
//     // for (var i of this.methods) {
//     Object.keys(this.methods).forEach(i => {
//       var params = this.methods[i].params;
//       // for (var j in defParams)
//       Object.keys(defParams).forEach(j => {
//         if ((typeof(params[j]) == 'undefined'))
//         params[j] = defParams[j];
//       }) 
//     })

//   // initialize settings
//   // this.calcMethod = this.methods[method] ? method : this.calcMethod;
//   var params = this.methods[this.calcMethod].params;
//   for (var id in params)
//     this.setting[id] = params[id];

//   // init time offsets
//   for (var i in this.timeNames)
//     this.offset[i] = 0;
//   }


//   userPrayerTimeSettings;

//   // default = {
//   //   params: {
//   //     maghrib: '0 min', 
//   //     midnight: 'Standard'
//   //   },
//   //   calcMethod: 'MWL',
//   //   settings: {  
//   //     imsak    : '10 min',
//   //     dhuhr    : '0 min',  
//   //     asr      : 'Standard',
//   //     highLats : 'NightMiddle'
//   //   },
//   //   timeFormat: '24h',
//   //   timeSuffixes: ['am', 'pm'],
//   //   invalidTime : '-----',
//   //   numIterations: 1,
//   //   offset: {}
//   // }



//   //---------------------- Initialization -----------------------

//   // set methods defaults
//   // defParams = this.defaultParams;
//   // for (var i of this.methods) {
//   //   var params = this.methods[i].params;
//   //   for (var j in defParams)
//   //     if ((typeof(params[j]) == 'undefined'))
//   //       params[j] = defParams[j];
//   // };

//   // // initialize settings
//   // this.calcMethod = this.methods[method] ? method : this.calcMethod;
//   // var params = this.methods[this.calcMethod].params;
//   // for (var id in params)
//   //   setting[id] = params[id];

//   // // init time offsets
//   // for (var i in timeNames)
//   //   offset[i] = 0;

    

//   //----------------------- Public Functions ------------------------

//   // set calculation method 
//   setMethod(method) {
//     if (this.methods[method]) {
//       this.adjust(this.methods[method].params);
//       this.calcMethod = method;
//     }
//   }

//   // set calculating parameters
//   adjust(params) {
//     for (var id in params)
//       this.setting[id] = params[id];
//   }

//   // set time offsets
//   tune(timeOffsets) {
//     for (var i in timeOffsets)
//       this.offset[i] = timeOffsets[i];
//   }

//   // get current calculation method
//   getMethod() { 
//     return this.calcMethod; 
//   }

//   // get current setting
//   getSetting() { 
//     return this.setting; 
//   }

//   // get current time offsets
//   getOffsets() { 
//     return this.offset; 
//   }

//   // get default calc parametrs
//   getDefaults() { 
//     return this.methods; 
//   }

//   // return prayer times for a given date
//   getTimes(date, coords, timezone, dst, format) {
//     this.lat = 1* coords[0];
//     this.lng = 1* coords[1]; 
//     this.elv = coords[2] ? 1* coords[2] : 0;
//     this.timeFormat = format || this.timeFormat;
//     if (date.constructor === Date){
//       date = [date.getFullYear(), date.getMonth()+ 1, date.getDate()];
//     }
//     if (typeof(timezone) == 'undefined' || timezone == 'auto'){
//       timezone = this.getTimeZone(date);
//     }
//     if (typeof dst == 'undefined' || dst == 'auto') {
//       dst = this.getDst(date);
//     }
//     this.timeZone = 1* timezone+ (1* dst ? 1 : 0);
//     this.jDate = this.julian(date[0], date[1], date[2])- this.lng/ (15* 24);
    
//     return this.computeTimes();
//   }


//   // convert float time to the given format (see timeFormats)
//   getFormattedTime(time, format, suffixes) {
//     if (isNaN(time))
//       return this.invalidTime;
//     if (format == 'Float') return time;
//     suffixes = suffixes || this.timeSuffixes;

//     time = this.dMath.fixHour(time+ 0.5/ 60);  // add 0.5 minutes to round
//     var hours = Math.floor(time); 
//     var minutes = Math.floor((time- hours)* 60);
//     var suffix = (format == '12h') ? suffixes[hours < 12 ? 0 : 1] : '';
//     var hour = (format == '24h') ? this.twoDigitsFormat(hours) : ((hours+ 12 -1)% 12+ 1);
//     return hour+ ':'+ this.twoDigitsFormat(minutes)+ (suffix ? ' '+ suffix : '');
//   }


//   //---------------------- Calculation Functions -----------------------


//   // compute mid-day time
//   midDay(time) {
//     var eqt = this.sunPosition(this.jDate+ time).equation;
//     var noon = this.dMath.fixHour(12- eqt);
//     return noon;
//   }


//   // compute the time at which sun reaches a specific angle below horizon
//   sunAngleTime(angle, time, direction) {
//     var decl = this.sunPosition(this.jDate+ time).declination;
//     var noon = this.midDay(time);
//     var t = 1/15* this.dMath.arccos((-this.dMath.sin(angle)- this.dMath.sin(decl)* this.dMath.sin(this.lat))/ 
//         (this.dMath.cos(decl)* this.dMath.cos(this.lat)));
//     return noon+ (direction == 'ccw' ? -t : t);
//   }


//   // compute asr time 
//   asrTime(factor, time) { 
//     var decl = this.sunPosition(this.jDate+ time).declination;
//     var angle = -this.dMath.arccot(factor+ this.dMath.tan(Math.abs(this.lat- decl)));
//     return this.sunAngleTime(angle, time, null);
//   }


//   // compute declination angle of sun and equation of time
//   // Ref: http://aa.usno.navy.mil/faq/docs/SunApprox.php
//   sunPosition(jd) {
//     var D = jd - 2451545.0;
//     var g = this.dMath.fixAngle(357.529 + 0.98560028* D);
//     var q = this.dMath.fixAngle(280.459 + 0.98564736* D);
//     var L = this.dMath.fixAngle(q + 1.915* this.dMath.sin(g) + 0.020* this.dMath.sin(2*g));

//     var R = 1.00014 - 0.01671* this.dMath.cos(g) - 0.00014* this.dMath.cos(2*g);
//     var e = 23.439 - 0.00000036* D;

//     var RA = this.dMath.arctan2(this.dMath.cos(e)* this.dMath.sin(L), this.dMath.cos(L))/ 15;
//     var eqt = q/15 - this.dMath.fixHour(RA);
//     var decl = this.dMath.arcsin(this.dMath.sin(e)* this.dMath.sin(L));

//     return {declination: decl, equation: eqt};
//   }


//   // convert Gregorian date to Julian day
//   // Ref: Astronomical Algorithms by Jean Meeus
//   julian(year, month, day) {
//     if (month <= 2) {
//       year -= 1;
//       month += 12;
//     };
//     var A = Math.floor(year/ 100);
//     var B = 2- A+ Math.floor(A/ 4);

//     var JD = Math.floor(365.25* (year+ 4716))+ Math.floor(30.6001* (month+ 1))+ day+ B- 1524.5;
//     return JD;
//   }


//   //---------------------- Compute Prayer Times -----------------------


//   // compute prayer times at given julian date
//   computePrayerTimes(times) {
//     times = this.dayPortion(times);
//     var params  = this.setting;
    
//     var imsak   = this.sunAngleTime(this.eval(params.imsak), times.imsak, 'ccw');
//     var fajr    = this.sunAngleTime(this.eval(params.fajr), times.fajr, 'ccw');
//     var sunrise = this.sunAngleTime(this.riseSetAngle(), times.sunrise, 'ccw');  
//     var dhuhr   = this.midDay(times.dhuhr);
//     var asr     = this.asrTime(this.asrFactor(params.asr), times.asr);
//     var sunset  = this.sunAngleTime(this.riseSetAngle(), times.sunset, null);;
//     var maghrib = this.sunAngleTime(this.eval(params.maghrib), times.maghrib, null);
//     var isha    = this.sunAngleTime(this.eval(params.isha), times.isha, null);

//     return {
//       imsak: imsak, fajr: fajr, sunrise: sunrise, dhuhr: dhuhr, 
//       asr: asr, sunset: sunset, maghrib: maghrib, isha: isha
//     };
//   }


//   // compute prayer times 
//   computeTimes() {
//     // default times
//     var times = { 
//       imsak: 5, fajr: 5, sunrise: 6, dhuhr: 12, 
//       asr: 13, sunset: 18, maghrib: 18, isha: 18
//     };

//     // main iterations
//     for (var i=1 ; i<=this.numIterations ; i++) {
//       times = this.computePrayerTimes(times);
//     }
//     times = this.adjustTimes(times);
    
//     // add midnight time
//     times[midnight] = (this.setting.midnight == 'Jafari') ? (
//         times.sunset+ this.timeDiff(times.sunset, times.fajr)/ 2 
//       ):(
//         times.sunset+ this.timeDiff(times.sunset, times.sunrise)/ 2);

//     times = this.tuneTimes(times);
//     return this.modifyFormats(times);
//   }


//   // adjust times 
//   adjustTimes(times) {
//     var params = this.setting;
//     for (var i in times)
//       times[i] += this.timeZone- this.lng/ 15;
      
//     if (params.highLats != 'None')
//       times = this.adjustHighLats(times);
      
//     if (this.isMin(params.imsak))
//       times.imsak = times.fajr- this.eval(params.imsak)/ 60;
//     if (this.isMin(params.maghrib))
//       times.maghrib = times.sunset+ this.eval(params.maghrib)/ 60;
//     if (this.isMin(params.isha))
//       times.isha = times.maghrib+ this.eval(params.isha)/ 60;
//     times.dhuhr += this.eval(params.dhuhr)/ 60; 

//     return times;
//   }


//   // get asr shadow factor
//   asrFactor(asrParam) {
//     var factor = {Standard: 1, Hanafi: 2}[asrParam];
//     return factor || this.eval(asrParam);
//   }


//   // return sun angle for sunset/sunrise
//   riseSetAngle() {
//     //var earthRad = 6371009; // in meters
//     //var angle = this.dMath.arccos(earthRad/(earthRad+ elv));
//     var angle = 0.0347* Math.sqrt(this.elv); // an approximation
//     return 0.833+ angle;
//   }


//   // apply offsets to the times
//   tuneTimes(times) {
//     for (var i in times)
//       times[i] += this.offset[i]/ 60; 
//     return times;
//   }


//   // convert times to given time format
//   modifyFormats(times) {
//     for (var i in times)
//       times[i] = this.getFormattedTime(times[i], this.timeFormat, null); 
//     return times;
//   }


//   // adjust times for locations in higher latitudes
//   adjustHighLats(times) {
//     var params = this.setting;
//     var nightTime = this.timeDiff(times.sunset, times.sunrise); 

//     times.imsak = this.adjustHLTime(times.imsak, times.sunrise, this.eval(params.imsak), nightTime, 'ccw');
//     times.fajr  = this.adjustHLTime(times.fajr, times.sunrise, this.eval(params.fajr), nightTime, 'ccw');
//     times.isha  = this.adjustHLTime(times.isha, times.sunset, this.eval(params.isha), nightTime, null);
//     times.maghrib = this.adjustHLTime(times.maghrib, times.sunset, this.eval(params.maghrib), nightTime, null);
    
//     return times;
//   }


//   // adjust a time for higher latitudes
//   adjustHLTime(time, base, angle, night, direction) {
//     var portion = this.nightPortion(angle, night);
//     var timeDiff = (direction == 'ccw') ? 
//       this.timeDiff(time, base):
//       this.timeDiff(base, time);
//     if (isNaN(time) || timeDiff > portion) 
//       time = base+ (direction == 'ccw' ? -portion : portion);
//     return time;
//   }


//   // the night portion used for adjusting times in higher latitudes
//   nightPortion(angle, night) {
//     var method = this.setting.highLats;
//     var portion = 1/2 // MidNight
//     if (method == 'AngleBased')
//       portion = 1/60* angle;
//     if (method == 'OneSeventh')
//       portion = 1/7;
//     return portion* night;
//   }


//   // convert hours to day portions 
//   dayPortion(times) {
//     for (var i in times)
//       times[i] /= 24;
//     return times;
//   }


//   //---------------------- Time Zone Functions -----------------------


//   // get local time zone
//   getTimeZone(date) {
//     var year = date[0];
//     var t1 = this.gmtOffset([year, 0, 1]);
//     var t2 = this.gmtOffset([year, 6, 1]);
//     return Math.min(t1, t2);
//   }


//   // get daylight saving for a given date
//   getDst(date){
//     let isDST = this.gmtOffset(date) != this.getTimeZone(date) ? 1 : 0;
//     return isDST;
//     // return 1 * (this.gmtOffset(date) != this.getTimeZone(date));
//   }


//   // UTC offset for a given date
//   gmtOffset(date) {
//     var localDate: any = new Date(date[0], date[1]- 1, date[2], 12, 0, 0, 0);
//     var UTCString = localDate.toUTCString();
//     var UTCDate: any = new Date(UTCString.substring(0, UTCString.lastIndexOf(' ') - 1));
//     var hoursDiff = (localDate - UTCDate) / (1000* 60* 60);
//     return hoursDiff;
//   }


//   //---------------------- Misc Functions -----------------------

//   // convert given string into a number
//   eval(str) {
//     return 1* (str+ '').split(/[^0-9.+-]/)[0];
//   }


//   // detect if input contains 'min'
//   isMin(arg) {
//     return (arg+ '').indexOf('min') != -1;
//   }


//   // compute the difference between two times 
//   timeDiff(time1, time2) {
//     return this.dMath.fixHour(time2- time1);
//   }


//   // add a leading 0 if necessary
//   twoDigitsFormat(num) {
//     return (num <10) ? '0'+ num : num;
//   }

// }




// //--------------------- Help and Manual ----------------------
// /*

// User's Manual: 
// http://praytimes.org/manual

// Calculation Formulas: 
// http://praytimes.org/calculation



// //------------------------ User Interface -------------------------


// 	getTimes (date, coordinates [, timeZone [, dst [, timeFormat]]]) 
	
// 	setMethod (method)       // set calculation method 
// 	adjust (parameters)      // adjust calculation parameters	
// 	tune (offsets)           // tune times by given offsets 

// 	getMethod ()             // get calculation method 
// 	getSetting ()            // get current calculation parameters
// 	getOffsets ()            // get current time offsets


// //------------------------- Sample Usage --------------------------


// 	var PT = new PrayTimes('ISNA');
// 	var times = PT.getTimes(new Date(), [43, -80], -5);
// 	document.write('Sunrise = '+ times.sunrise)


// */
 
// 	//----------------------- Parameter Values ----------------------
// 	/*
	
// 	// Asr Juristic this.methods
// 	asrJuristics = [ 
// 		'Standard',    // Shafi`i, Maliki, Ja`fari, Hanbali
// 		'Hanafi'       // Hanafi
// 	],


// 	// Midnight Mode
// 	midnightthis.methods = [ 
// 		'Standard',    // Mid Sunset to Sunrise
// 		'Jafari'       // Mid Sunset to Fajr
// 	],


// 	// Adjust this.methods for Higher Latitudes
// 	highLatthis.methods = [
// 		'NightMiddle', // middle of night
// 		'AngleBased',  // angle/60th of night
// 		'OneSeventh',  // 1/7th of night
// 		'None'         // No adjustment
// 	],


// 	// Time Formats
// 	timeFormats = [
// 		'24h',         // 24-hour format
// 		'12h',         // 12-hour format
// 		'12hNS',       // 12-hour format with no suffix
// 		'Float'        // floating point number 
// 	],
// 	*/	


	
	


// //---------------------- Init Object -----------------------


// // var prayTimes = new PrayTimes();

