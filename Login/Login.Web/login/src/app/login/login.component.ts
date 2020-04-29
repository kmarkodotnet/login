import { Component, OnInit, ViewChild, ElementRef, Inject, EventEmitter } from '@angular/core';
import { GoogleAuthService } from '../services/google.auth.service';

import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SessionService } from '../services/session.service';
import { SessionInfo } from '../model/session-info';
import { LoginFramework } from '../model/login-framework';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  onClose = new EventEmitter();
  auth2: any;
  
  @ViewChild('loginRef') loginElement: ElementRef;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private auth: GoogleAuthService, private sessionService:SessionService) { }

  ngOnInit(): void {    
    this.googleSDK();
    this.facebookSDK();
  }

  facebookLogin() {
    window['FB'].login((response) => {
      if (response.authResponse) {        
        window['FB'].api('/me', {
          fields: 'last_name, first_name, email'
        }, (userInfo) => {

          this.sessionService.login(new SessionInfo(
            response.authResponse.userID,
            "", 
            response.authResponse.accessToken,
            userInfo.email,
            userInfo.first_name + " " + userInfo.last_name,
            response.authResponse.expiresIn,
            LoginFramework.facebook
          ));

          this.onClose.emit();
        });
         
      } else {
        console.log('User login failed');
      }
    }, {scope: 'email'});
  }

  prepareLoginButton() { 
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => { 

        let profile = googleUser.getBasicProfile();
        let authResp = googleUser.getAuthResponse();

        this.sessionService.login(new SessionInfo(
          profile.getId(),
          authResp.id_token, 
          authResp.access_token,
          profile.getEmail(),
          profile.getName(),
          authResp.expires_in,
          LoginFramework.google
        ));       

        this.onClose.emit();
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }); 
  }

  googleSDK() { 
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '536917715431-eafj76ncqp1nqf6nnsb8hgo9dec2u4qr.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    } 
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk')); 
  }

  facebookSDK(){
    (window as any).fbAsyncInit = function() {
      window['FB'].init({
        appId      : '732651050902124',
        cookie     : true,
        xfbml      : true,
        version    : 'v6.0'
      });        
      window['FB'].AppEvents.logPageView();           
    };  
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }
}
