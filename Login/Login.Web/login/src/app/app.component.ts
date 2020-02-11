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
    this.isLoggedIn$ = this.auth.isLoggedIn$;
    this.isLoggedOut$ = this.auth.isLoggedOut$;
  }





}
