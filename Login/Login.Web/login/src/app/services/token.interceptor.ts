import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    
    /**
     *
     */
    constructor() {
        console.log("sdf");
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("sdf");
        const idToken = localStorage.getItem("id_token");
        if(idToken){
            const cloned = req.clone({
                headers: req.headers.set("Authorization", "Bearer "+ idToken),
                withCredentials: true
            });

            return next.handle(cloned);
        }else{
            return next.handle(req);
        }
    }

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     console.log("sdf");
    //     const idToken = localStorage.getItem("id_token");
    //     if(idToken){
    //         const cloned = req.clone({
    //             headers: req.headers.set("Authorization", "Bearer "+ idToken)
    //         });

    //         return next.handle(cloned);
    //     }else{
    //         return next.handle(req);
    //     }
    // }

}