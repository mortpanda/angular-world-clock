import { Injectable, OnDestroy } from '@angular/core';
import { TimezoneDataService } from 'app/shared/world-clock/timezone-data.service';
import { DatePipe } from '@angular/common';

import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetTimeService {



  strTokyoDate;
  strTokyoTime;
  strSanFranDate;
  strSanFranTime;
  strLondonDate;
  strLondonTime;
  arrTimeData;
  public strApiURL = 'https://worldtimeapi.org/api/timezone/';

  constructor(
    public TimezoneDataService: TimezoneDataService,
    public datePipe: DatePipe,
  ) { }



  async GetTime(strTimeZone) {

    const FetchTime = fetch(this.strApiURL + strTimeZone, {
      method: 'GET'
    })
      .then(response => response.json())
      .catch(error => console.log('error', error));
    this.arrTimeData = await FetchTime;
    console.log(this.arrTimeData);

    switch (strTimeZone) {
      case 'Asia/Tokyo': {
        this.strTokyoDate = this.datePipe.transform(this.arrTimeData.datetime, "MMMM d, yyyy", this.arrTimeData.utc_offset);
        this.strTokyoTime = this.datePipe.transform(this.arrTimeData.datetime, "HH:mm", this.arrTimeData.utc_offset);
        break;
      }
      case 'America/Los_Angeles': {
        this.strSanFranDate = this.datePipe.transform(this.arrTimeData.datetime, "MMMM d, yyyy", this.arrTimeData.utc_offset);
        this.strSanFranTime = this.datePipe.transform(this.arrTimeData.datetime, "HH:mm", this.arrTimeData.utc_offset);
        break;
      }
      case 'Europe/London': {
        this.strLondonDate = this.datePipe.transform(this.arrTimeData.datetime, "MMMM d, yyyy", this.arrTimeData.utc_offset);
        this.strLondonTime = this.datePipe.transform(this.arrTimeData.datetime, "HH:mm", this.arrTimeData.utc_offset);
        break;
      }
    }

  }





  colTokyo;
  async GetWorldTime() {

    interval(1000 * 5).subscribe(x => {
      this.GetTime(this.TimezoneDataService.TimeZoneTokyo);
      this.GetTime(this.TimezoneDataService.TimeZoneSanFran);
      this.GetTime(this.TimezoneDataService.TimeZoneLondon);
    })







    // await this.GetTime(this.TimezoneDataService.TimeZoneTokyo)
    // this.strTokyoDate = this.datePipe.transform(this.arrTimeData.datetime, "MMMM d, yyyy", this.arrTimeData.utc_offset);
    // this.strTokyoTime = this.datePipe.transform(this.arrTimeData.datetime, "HH:mm", this.arrTimeData.utc_offset);

    // await this.GetTime(this.TimezoneDataService.TimeZoneSanFran)
    // this.strSanFranDate = this.datePipe.transform(this.arrTimeData.datetime, "MMMM d, yyyy", this.arrTimeData.utc_offset);
    // this.strSanFranTime = this.datePipe.transform(this.arrTimeData.datetime, "HH:mm", this.arrTimeData.utc_offset);

    // await this.GetTime(this.TimezoneDataService.TimeZoneLondon)
    // this.strLondonDate = this.datePipe.transform(this.arrTimeData.datetime, "MMMM d, yyyy", this.arrTimeData.utc_offset);
    // this.strLondonTime = this.datePipe.transform(this.arrTimeData.datetime, "HH:mm", this.arrTimeData.utc_offset);


  }




}
