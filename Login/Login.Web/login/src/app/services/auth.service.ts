import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Observer } from 'rxjs';
import { User } from '../model/user';
import { map } from 'rxjs/internal/operators/map';
import { shareReplay } from 'rxjs/internal/operators/shareReplay';
import { tap } from 'rxjs/internal/operators/tap';
import { filter } from 'rxjs/internal/operators/filter';
import { Config } from '../config';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
//import { from, of, combineLatest, throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as auth0 from "auth0-js";
import * as m from "moment";

export const ANONYMUS_USER : User = {
  id:undefined,
  email:''
}

const AUTH_CONFIG ={
  clientID: "B0hvw0bwf4P0eWYBDjX87UZNekk6JamX",
  domain:"kmarkologin.eu.auth0.com"
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private subject = new BehaviorSubject<User>(undefined);
  user$: Observable<User> = this.subject.asObservable().pipe(filter(user => !!undefined));

  constructor(private http: HttpClient, private router: Router) { 
    if(this.isLoggedIn()){
      this.userInfo();
    }
  }


  userInfo() {
    const url = Config.API_BASE_URL + 'userinfo';
    this.http.put<User>(url, null)
    .pipe(shareReplay())
    //.pipe(do( user => this.subject.next(user)))
    .subscribe(user => 
      {
        console.log(user);
        this.subject.next(user);
      }
      );
  }

  setSession(result: any) {
    const expiresAt = m().add(result.authResponse.expiresIn,'second');
    localStorage.setItem("id_token",result.authResponse.accessToken);
    localStorage.setItem("fb_user_id",result.authResponse.userID);
    localStorage.setItem("expiresAt",JSON.stringify(expiresAt.valueOf()));
  }
  
  getExpiration(){
    const expires = JSON.parse(localStorage.getItem("expiresAt"));
    return m(expires);
  }

  login(){
    this.faceBookLogin();
  }
  faceBookLogin() {
    window['FB'].login((response) => {
      if (response.authResponse) {
        this.setSession(response);
        window['FB'].api('/me', {
          fields: 'last_name, first_name, email'
        }, (userInfo) => {
          this.setEmail(userInfo.email);
          this.userInfo();
        });
         
      } else {
        console.log('User login failed');
      }
    }, {scope: 'email'});
  }

  setEmail(email: any) {
    localStorage.setItem("email",email);
  }

  signUp(){
    this.faceBookLogin();
  }

  logOut(){
    window['FB'].getLoginStatus(function(response) {
      window['FB'].logout(function(response){
        console.log("Logged Out!");
      });
    });

    localStorage.removeItem("id_token");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("fb_user_id");

    localStorage.removeItem("email");
    
    this.router.navigate(["/lessons"]);
  }
  

  public isLoggedIn() {
    return m().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }
}
