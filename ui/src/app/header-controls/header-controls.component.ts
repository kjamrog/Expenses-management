import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-controls',
  templateUrl: './header-controls.component.html',
  styleUrls: ['./header-controls.component.scss']
})
export class HeaderControlsComponent implements OnInit {
  logged = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.loginChange.subscribe(logged => {
      this.logged = logged;
    });
  }

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.logged = true;
    }
  }

  logout() {
    this.authService.logout();
    this.logged = false;
  }

  goToLogin() {
    this.router.navigate(['/account/login']);
  }

  goToRegistration() {
    this.router.navigate(['/account/register']);
  }

}
