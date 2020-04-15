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

  retrieveAuthInfoFromUrl() {
    this.auth0.parseHash((err, authResult) =>{

      if(err){
        console.log(err);
        return;

      }else if(authResult && authResult.idToken){
        window.location.hash = "";
        this.setSession(authResult);

        this.userInfo();
      }      
    });
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

  setSession(authResult: any) {
    const expiresAt = m().add(authResult.expiresIn,'second');
    localStorage.setItem("id_token",authResult.idToken);
    localStorage.setItem("expiresAt",JSON.stringify(expiresAt.valueOf()));
  }
  
  getExpiration(){
    const expires = JSON.parse(localStorage.getItem("expiresAt"));
    return m(expires);
  }

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    redirectUri: 'https://localhost:4200/lessons',
    //scope: "openid email"
  });


  login(){
    this.auth0.authorize({initialScreen:'login'});
  }

  signUp(){
    this.auth0.authorize({initialScreen:'signUp',loginAfterSignUp:false});
  }

  logOut(){
    localStorage.removeItem("id_token");
    localStorage.removeItem("expiresAt");
    this.router.navigate(["/lessons"]);
  }
  

  public isLoggedIn() {
    return m().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }
}
