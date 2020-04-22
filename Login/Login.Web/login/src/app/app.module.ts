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

@NgModule({
  declarations: [
    AppComponent,
    LessonsComponent,
    Lessons2Component,
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
      RouterModule.forRoot(routesConfig),
      ReactiveFormsModule
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
