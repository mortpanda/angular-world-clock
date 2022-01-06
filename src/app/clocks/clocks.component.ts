import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaGetTokenService } from 'app/shared/okta/okta-get-token.service';
import { OktaSDKAuthService } from '../shared/okta/okta-auth.service';
import { OktaAuth } from '@okta/okta-auth-js';
import { GetTimeService } from 'app/shared/world-clock/get-time.service';


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
        await this.GetTimeService.GetWorldTime();
        break;
    }
  }

 



}
