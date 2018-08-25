import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

enum Mode {
  LOGIN = 'login',
  REGISTER = 'register'
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registration: boolean;

  username: string;
  password: string;
  repeatPassword: string;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.mode === Mode.REGISTER){
        this.registration = true;
      } else if (params.mode === Mode.LOGIN){
        this.registration = false;
      } else {
        this.router.navigate(['/account/login']);
      }
    });
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(res => {
      this.router.navigate(['/home']);
    });
  }

  register() {
    if (!this.username || this.username.length === 0){
      console.error('Username is required');
    }
    if(!this.password){
      console.error('Password is required');
    }
    if (this.password !== this.repeatPassword){
      console.error('Different passwords');
      return;
    }
    const user = this.username;
    const pass = this.password
    this.authService.register(user, pass).subscribe(() => {
      this.authService.login(user, pass).subscribe(() => {
        this.router.navigate(['/home']);
      });
    });
  }

}
