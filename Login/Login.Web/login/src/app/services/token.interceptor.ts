import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';
import { HeaderInfo } from '../model/header-info';
import { LoginFramework } from '../model/login-framework';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    
    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headerInfo = this.getHeaderInfo();

        if(headerInfo){
            const cloned = req.clone({
                headers: req.headers
                    .set("Authorization", headerInfo.token)
                    .set("Email", headerInfo.email)
                    .set("Framework", headerInfo.framework.toString())
                    .set("Content-Type", "application/json"),
                withCredentials: true
            });

            return next.handle(cloned);
        }else{
            return next.handle(req);
        }
    }

    
  getHeaderInfo():HeaderInfo{
    let headerInfo = new HeaderInfo();

    const framework = +localStorage.getItem("framework");    
    switch(framework){
      case LoginFramework.facebook:
        headerInfo.token = localStorage.getItem("access_token");
        break;
      case LoginFramework.google:
        headerInfo.token = localStorage.getItem("id_token");
        break;
    }

    headerInfo.framework = framework;
    headerInfo.email = localStorage.getItem("email");   

    return headerInfo;
  }
}