import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaGetTokenService } from 'app/shared/okta/okta-get-token.service';
import { OktaSDKAuthService } from '../shared/okta/okta-auth.service';
import { OktaAuth } from '@okta/okta-auth-js';
import { GetTimeService } from 'app/shared/world-clock/get-time.service';
import { TimezoneDataService } from 'app/shared/world-clock/timezone-data.service';
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
    public GetTimeService: GetTimeService,
    public TimezoneDataService: TimezoneDataService,
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
        this.GetTime();
        break;
    }
  }

  strTokyoDate;
  strTokyoTime;
  strSanFranDate;
  strSanFranTime;
  strLondonDate;
  strLondonTime;
  async GetTime() {

    await this.GetTimeService.GetTime(this.TimezoneDataService.TimeZoneTokyo)
    this.strTokyoDate = this.datePipe.transform(this.GetTimeService.arrTimeData.datetime, "MMMM d, yyyy", this.GetTimeService.arrTimeData.utc_offset);
    this.strTokyoTime = this.datePipe.transform(this.GetTimeService.arrTimeData.datetime, "HH:mm", this.GetTimeService.arrTimeData.utc_offset);

    await this.GetTimeService.GetTime(this.TimezoneDataService.TimeZoneSanFran)
    this.strSanFranDate = this.datePipe.transform(this.GetTimeService.arrTimeData.datetime, "MMMM d, yyyy", this.GetTimeService.arrTimeData.utc_offset);
    this.strSanFranTime = this.datePipe.transform(this.GetTimeService.arrTimeData.datetime, "HH:mm", this.GetTimeService.arrTimeData.utc_offset);

    await this.GetTimeService.GetTime(this.TimezoneDataService.TimeZoneLondon)
    this.strLondonDate = this.datePipe.transform(this.GetTimeService.arrTimeData.datetime, "MMMM d, yyyy", this.GetTimeService.arrTimeData.utc_offset);
    this.strLondonTime = this.datePipe.transform(this.GetTimeService.arrTimeData.datetime, "HH:mm", this.GetTimeService.arrTimeData.utc_offset);


  }



}
