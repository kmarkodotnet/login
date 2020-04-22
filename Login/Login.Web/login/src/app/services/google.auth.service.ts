import { Injectable, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Observer } from 'rxjs';
import { User } from '../model/user';
import { shareReplay } from 'rxjs/internal/operators/shareReplay';
import { filter } from 'rxjs/internal/operators/filter';
import { Config } from '../config';
import { Router } from '@angular/router';
import * as m from "moment";

export const ANONYMUS_USER : User = {
  id:undefined,
  email:''
}

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  
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

  // setSession(result: any) {
  //   const expiresAt = m().add(result.authResponse.expiresIn,'second');
  //   localStorage.setItem("id_token",result.authResponse.accessToken);
  //   localStorage.setItem("fb_user_id",result.authResponse.userID);
  //   localStorage.setItem("expiresAt",JSON.stringify(expiresAt.valueOf()));
  // }

  setSession(token:string,id:string,email:string, expires:number) {
    const expiresAt = m().add(expires,'second');
    localStorage.setItem("id_token",token);
    localStorage.setItem("user_id",id);
    localStorage.setItem("email",email);
    localStorage.setItem("expiresAt",JSON.stringify(expiresAt.valueOf()));
  }


  getExpiration(){
    const expires = JSON.parse(localStorage.getItem("expiresAt"));
    return m(expires);
  }

  logOut(){    

    localStorage.removeItem("id_token");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("user_id");

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
