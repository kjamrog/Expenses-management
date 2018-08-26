import {MatSnackBar} from '@angular/material';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackBarsService {

  constructor(private snackBar: MatSnackBar) { }

  open(message: string, action: string = 'Close'){
    this.snackBar.open(message, action, {
      duration: 4000
    });
  }
}
