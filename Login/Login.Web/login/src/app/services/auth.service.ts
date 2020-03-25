import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../model/user';
import { map } from 'rxjs/internal/operators/map';
import { shareReplay } from 'rxjs/internal/operators/shareReplay';
import { tap } from 'rxjs/internal/operators/tap';
import { filter } from 'rxjs/internal/operators/filter';
import { Config } from '../config';

export const ANONYMUS_USER : User = {
  id:undefined,
  email:''
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  private subject = new BehaviorSubject<User>(ANONYMUS_USER);

  user$: Observable<User> = this.subject.asObservable().pipe(filter(user => !!user));

  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.id));

  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

  constructor(private http:HttpClient) {
    this.http.get<User>(Config.API_BASE_URL + "user",{withCredentials: true}).subscribe(user => this.subject.next(user ? user : ANONYMUS_USER));
   }


  sessionId = "";
  sessionIdName = "SESSIONID";

  signup(email:string, password:string):Observable<User>{
    const user = new User();
    user.email = email;
 
    return this.http.post<User>(Config.API_BASE_URL + "signup", {email, password},
    {withCredentials: true})
    .pipe(
      shareReplay(),
      tap(user => this.subject.next(user)),);
  }

  login(email:string, password:string):Observable<User>{
    const user = new User();
    user.email = email;
 
    return this.http.post<User>(Config.API_BASE_URL + "login", {email, password},
    {withCredentials: true})
    .pipe(
      shareReplay(),
      tap(user => this.subject.next(user)),);
  }

  logOut():Observable<any> {
    return this.http.post(Config.API_BASE_URL + "logout",null,
    {withCredentials: true}).pipe(
      shareReplay(),
      tap(() => this.subject.next(ANONYMUS_USER)),);
  }
}
