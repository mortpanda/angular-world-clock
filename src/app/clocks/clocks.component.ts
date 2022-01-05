import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaGetTokenService } from 'app/shared/okta/okta-get-token.service';
import { OktaSDKAuthService } from '../shared/okta/okta-auth.service';
import { OktaAuth } from '@okta/okta-auth-js';
import {GetTimeService} from 'app/shared/world-clock/get-time.service';
import {TimezoneDataService} from 'app/shared/world-clock/timezone-data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clocks',
  templateUrl: './clocks.component.html',
  styleUrls: ['./clocks.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClocksComponent implements OnInit {
  strThisSession;
  strUserSession: Boolean;
  public authService = new OktaAuth(this.OktaSDKAuthService.config);
  constructor(
    public OktaGetTokenService: OktaGetTokenService,
    public OktaSDKAuthService: OktaSDKAuthService,
    public GetTimeService:GetTimeService,
    public TimezoneDataService:TimezoneDataService,
    public datePipe: DatePipe,

  ) { }

  async ngOnInit() {

    this.authService.token.getUserInfo()
      .then(function (user) {
        //console.log(user)
      })
    this.strUserSession = await this.authService.session.exists()
      .then(function (exists) {
        if (exists) {
          // logged in
          return exists
        } else {
          // not logged in
          return exists
        }
      });
    switch (this.strUserSession == true) {
      case false:
        //alert(this.oktaSDKAuth.config.redirectUri)
        // alert('ログインしてください')
        //await this.NotAuthed();
        await window.location.replace('/');
      case true:
        this.OktaGetTokenService.GetAccessToken();
        break;
    }
  }

async GetTime(){
  
  await this.GetTimeService.GetTime(this.TimezoneDataService.TimeZoneSanFran)
  //console.log(this.GetTimeService.arrTimeData.datetime)
  console.log(this.datePipe.transform(this.GetTimeService.arrTimeData.datetime,"MM/dd/YYYY HH:mm",this.GetTimeService.arrTimeData.utc_offset)); 

  

}



}
