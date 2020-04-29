import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Observer } from 'rxjs';
import { User } from '../model/user';
import { shareReplay } from 'rxjs/internal/operators/shareReplay';
import { filter } from 'rxjs/internal/operators/filter';
import { Config } from '../config';
import { Router } from '@angular/router';
import * as m from "moment";
import { SessionInfo } from '../model/session-info';
import { HeaderInfo } from '../model/header-info';
import { LoginFramework } from '../model/login-framework';

export const ANONYMUS_USER : User = {
  id:undefined,
  email:''
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  
  private subject = new BehaviorSubject<User>(undefined);
  user$: Observable<User> = this.subject.asObservable().pipe(filter(user => !!undefined));

  constructor(private http: HttpClient, private router: Router) { 
    if(this.isLoggedIn()){
      this.userInfo();
    }
  }

  userInfo():void {
    const url = Config.API_BASE_URL + 'userinfo';
    this.http.put<User>(url, null)
    .pipe(shareReplay())
    .subscribe(user => 
      {
        console.log(user);
        this.subject.next(user);
      }
      );
  }

  login(result: SessionInfo):void {
    this.logOut();
    const expiresAt = m().add(result.expire,'second');
    if(result.id_token){
      localStorage.setItem("id_token",result.id_token);
    }
    if(result.access_token){
      localStorage.setItem("access_token",result.access_token);
    }
    if(result.user_id){
      localStorage.setItem("user_id",result.user_id);
    }
    if(!!result.framework){
      localStorage.setItem("framework",result.framework.toString());
    }
    if(!!result.email){
      localStorage.setItem("email",result.email);
    }
    if(!!result.name){
      localStorage.setItem("name",result.name);
    }
    localStorage.setItem("expiresAt",JSON.stringify(expiresAt.valueOf()));

    this.userInfo();
  }
  
  getExpiration():m.Moment{
    const expires = JSON.parse(localStorage.getItem("expiresAt"));
    return m(expires);
  }

  logOut():void{
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("framework");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("expiresAt");
  }
 

  public isLoggedIn():boolean {
    return m().isBefore(this.getExpiration());
  }

  isLoggedOut():boolean {
      return !this.isLoggedIn();
  }

}
