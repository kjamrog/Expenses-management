import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';

@Injectable()
export class ResponseCheckingInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        res => console.log('Response'),
        err => {
          if(err.status === 401 || err.status === 403){
            this.authService.logout();
          }
        }
      )
    );

  }

}
