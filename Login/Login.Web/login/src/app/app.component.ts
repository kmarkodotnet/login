import { Component, ElementRef, ViewChild } from '@angular/core';
import { FacebookAuthService } from './services/facebook.auth.service';
import { User } from './model/user';
import { Observable } from 'rxjs';
import { GoogleAuthService } from './services/google.auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

 
  auth2: any;
  
  @ViewChild('loginRef') loginElement: ElementRef;
 
  constructor(private auth: GoogleAuthService) { }
 
  ngOnInit(){
    this.googleSDK();
  }

  signUp() {
  }

  login() {
  }

  logout() {
    this.auth.logOut();
  }

  isLoggedIn():boolean{
    return this.auth.isLoggedIn();
  }

  isLoggedOut():boolean{
    return this.auth.isLoggedOut();
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
        // console.log('Token || ' + googleUser.getAuthResponse().id_token);
        // console.log('ID: ' + profile.getId());
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
 
 
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
