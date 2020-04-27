import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FacebookAuthService } from './services/facebook.auth.service';
import { User } from './model/user';
import { Observable } from 'rxjs';
import { GoogleAuthService } from './services/google.auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  dialogRef:MatDialogRef<LoginComponent>;
 
  constructor(public dialog: MatDialog,private ngZone: NgZone) { }
 
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
    });    
  }

  logout() {
    //this.auth.logOut();
  }

  isLoggedIn():boolean{
    return false;//this.auth.isLoggedIn();
  }

  isLoggedOut():boolean{
    return true;//this.auth.isLoggedOut();
  }



}
