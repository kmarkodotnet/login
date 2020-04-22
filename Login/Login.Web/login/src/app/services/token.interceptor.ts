import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    
    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem("id_token");
        if(idToken){
            const cloned = req.clone({
                headers: req.headers
                    .set("Authorization", idToken)
                    .set("Content-Type", "application/json"),
                withCredentials: true
            });

            return next.handle(cloned);
        }else{
            return next.handle(req);
        }
    }
}