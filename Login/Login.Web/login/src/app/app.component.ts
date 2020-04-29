import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FacebookAuthService } from './services/facebook.auth.service';
import { User } from './model/user';
import { Observable } from 'rxjs';
import { GoogleAuthService } from './services/google.auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  dialogRef:MatDialogRef<LoginComponent>;
 
  constructor(public dialog: MatDialog,private ngZone: NgZone, private sessionService:SessionService) { }
 
  ngOnInit(){
  }

  signUp() {
  }

  login() {
    this.dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
      hasBackdrop: false,
    });

    const sub = this.dialogRef.componentInstance.onClose.subscribe(() => {
      this.closeDialog();
    });
  }

  closeDialog(){
    this.ngZone.run(() => {
      this.dialogRef.close();  
      this.dialogRef.componentInstance.onClose.unsubscribe();
    });    
  }

  logout() {
    this.sessionService.logOut();
  }

  isLoggedIn():boolean{
    return this.sessionService.isLoggedIn();
  }

  isLoggedOut():boolean{
    return this.sessionService.isLoggedOut();
  }



}
