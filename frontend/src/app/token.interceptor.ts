import { Injectable } from '@angular/core';
import {
 HttpRequest,
 HttpHandler,
 HttpEvent,
 HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

 constructor() {}

 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { // added any's in myself
    request = request.clone({
        setHeaders: {
            'ngrok-skip-browser-warning': 'true'
        }});
//    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
//    if (userData.token) {
//      request = request.clone({
//        setHeaders: {
//         'ngrok-skip-browser-warning': 'true',
//         Authorization: `Token ${userData.token}`
//        }
//      });
//    }
   return next.handle(request);
 }
}