import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../model/user';
import { map } from 'rxjs/internal/operators/map';
import { shareReplay } from 'rxjs/internal/operators/shareReplay';
import { tap } from 'rxjs/internal/operators/tap';
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

  user$:Observable<User> = this.subject.asObservable();

  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.id));
  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

  constructor(private http:HttpClient) { }

  signup(email:string, password:string):Observable<User>{
    const user = new User();
    user.email = email;
    return this.http.post<User>(Config.API_BASE_URL + "signup", {email, password})
    .pipe(shareReplay(),tap(user =>this.subject.next(user)));
  }
}
