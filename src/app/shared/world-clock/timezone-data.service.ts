import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimezoneDataService {
  TimeZoneTokyo = 'Asia/Tokyo';
  TimeZoneSanFran = 'America/Los_Angeles';
  TimeZoneLondon = 'Europe/London';

  constructor() { }
  
}
