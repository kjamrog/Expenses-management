import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatFormFieldModule, MatInputModule,
  MatOptionModule,
  MatSelectModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LoginGuard } from './guards/login.guard';
import {AuthService} from './services/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {TokenInterceptor} from './interceptors/token.interceptor';
import {ResponseCheckingInterceptor} from './interceptors/responseChecking.interceptor';
import { HeaderControlsComponent } from './header-controls/header-controls.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [LoginGuard]},
  {path: 'home', component: HomeComponent, canActivate: [LoginGuard]},
  {path: 'account/:mode', component: LoginComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderControlsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    MatTabsModule
  ],
  providers: [AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ResponseCheckingInterceptor, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
