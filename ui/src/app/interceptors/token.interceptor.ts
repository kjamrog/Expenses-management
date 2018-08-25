import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const token = localStorage.getItem('token');
    if (!token) {
      return next.handle(req);
    }
    const cloned = req.clone({
      headers: req.headers.set('Authorization', token)
    });

    return next.handle(cloned);
  }
}
