import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './model/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private auth:AuthService) { }

  ngOnInit(){    
    this.fbLibrary();
    //this.auth.retrieveAuthInfoFromUrl();
  }

  signUp() {
    this.auth.signUp();
  }

  login() {
    this.auth.login();
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

  fbLibrary(){
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
