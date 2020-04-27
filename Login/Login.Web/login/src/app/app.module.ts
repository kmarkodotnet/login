import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LessonsComponent } from './lessons/lessons.component';
import {RouterModule} from "@angular/router";
import {routesConfig} from "./routes.config";
import {LessonsService} from "./services/lessons.service";
import {ReactiveFormsModule} from "@angular/forms";
import { FacebookAuthService } from './services/facebook.auth.service';
import { Lessons2Component } from './lessons2/lessons2.component';
import { TokenInterceptor } from './services/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LessonsComponent,
    Lessons2Component,
    LoginComponent,
    
  ],
  imports: [
    HttpClientModule,    
    MatDialogModule,
    BrowserModule,
      RouterModule.forRoot(routesConfig),
      ReactiveFormsModule,
      BrowserAnimationsModule
  ],
  providers: [
    LessonsService,
    FacebookAuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
