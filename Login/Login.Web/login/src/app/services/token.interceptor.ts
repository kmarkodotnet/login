import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    
    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem("id_token");
        if(idToken){
            const hs = new HttpHeaders({"Authorization": idToken})
                //.set("Authorization", idToken)
                //.append("Content-Type", "application/json")
                ;            
                
            const cloned = req.clone({
                headers: hs,
                withCredentials: true
            });
            return next.handle(cloned);
        }else{
            return next.handle(req);
        }
    }
}