import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
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
  
  constructor(private http: HttpClient, private router: Router) {  }

  retrieveAuthInfoFromUrl() {
    this.auth0.parseHash((err, authResult) =>{

      if(err){
        console.log(err);
        return;

      }else if(authResult && authResult.idToken){
        window.location.hash = "";
        this.setSession(authResult);
      }      
    });
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
    redirectUri: 'https://localhost:4200/lessons'
  });

  private subject = new BehaviorSubject<User>(ANONYMUS_USER);

  user$: Observable<User> = this.subject.asObservable().pipe(filter(user => !!user));

  login(){
    this.auth0.authorize();
  }

  signUp(){
    
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
