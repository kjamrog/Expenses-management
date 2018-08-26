import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatDividerModule,
  MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule,
  MatOptionModule,
  MatSelectModule, MatSnackBarModule, MatTableModule, MatTabsModule,
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
import { AddCollectionDialogComponent } from './dialogs/add-collection-dialog/add-collection-dialog.component';
import { ExpenseAddingDialogComponent } from './dialogs/expense-adding-dialog/expense-adding-dialog.component';

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
    HeaderControlsComponent,
    AddCollectionDialogComponent,
    ExpenseAddingDialogComponent
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
    MatTabsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDividerModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  entryComponents: [AddCollectionDialogComponent, ExpenseAddingDialogComponent],
  providers: [AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ResponseCheckingInterceptor, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
