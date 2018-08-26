import { Component, OnInit } from '@angular/core';
import {AuthService, User} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-controls',
  templateUrl: './header-controls.component.html',
  styleUrls: ['./header-controls.component.scss']
})
export class HeaderControlsComponent implements OnInit {
  logged = false;
  currentUser: User;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.loginChange.subscribe(logged => {
      this.logged = logged;
      if(logged) {
        this.loadCurrentUser();
      }
    });
  }

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.logged = true;
      this.loadCurrentUser();
    }
  }

  loadCurrentUser(){
    this.authService.getCurrentUser().subscribe(currentUser => {
      this.currentUser = currentUser;
    });
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
