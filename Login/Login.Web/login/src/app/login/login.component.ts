import { Component, OnInit, ViewChild, ElementRef, Inject, EventEmitter } from '@angular/core';
import { GoogleAuthService } from '../services/google.auth.service';

import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  onClose = new EventEmitter();
  auth2: any;
  
  @ViewChild('loginRef') loginElement: ElementRef;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private auth: GoogleAuthService) { }

  ngOnInit(): void {    
    this.googleSDK();
  }


  login(){    
  }

  prepareLoginButton() { 
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => { 
        let profile = googleUser.getBasicProfile();
        let authResp = googleUser.getAuthResponse();
        let token =  authResp.id_token;
        let expires = authResp.expires_in;        
        let id = profile.getId();
        let email = profile.getEmail();
        this.auth.setSession(token,id,email,expires); 

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

}
