import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {API} from '../routes';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

export interface User {
  id: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loginChange = new Subject<boolean>();

  constructor(private router: Router, private http: HttpClient) { }

  login(username: string, password: string){
    return this.http.post(API.LOGIN, {username: username, password: password}, {observe: 'response'})
      .pipe(
        tap(result => {
          const token = result.headers.get('Authorization');
          localStorage.setItem('token', token);
          this.loginChange.next(true);
        })
      );
  }

  register(username: string, password: string){
    return this.http.post(API.SIGN_UP, {username: username, password: password}, {observe: 'response'});
  }

  test(){
    return this.http.get(API.TEST);
  }

  getCurrentUser(){
    return this.http.get(API.CURRENT_USER) as Observable<User>;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/account/login']);
    this.loginChange.next(false);
  }
}
