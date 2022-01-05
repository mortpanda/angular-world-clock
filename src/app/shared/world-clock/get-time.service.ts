import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GetTimeService {
  arrTimeData;
  public strApiURL = 'https://worldtimeapi.org/api/timezone/';

  constructor() { }

  async GetTime(strTimeZone) {

    const FetchTime = fetch(this.strApiURL + strTimeZone, {
      method: 'GET'
    })
      .then(response => response.json())
      .catch(error => console.log('error', error));
    this.arrTimeData = await FetchTime;
    console.log(this.arrTimeData);
  }



}
