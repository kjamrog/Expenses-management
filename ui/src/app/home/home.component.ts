import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Collection, CollectionsService, Expense} from '../services/collections.service';
import {SnackBarsService} from '../services/snackbars.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AddCollectionDialogComponent} from '../dialogs/add-collection-dialog/add-collection-dialog.component';
import {ExpenseAddingDialogComponent} from '../dialogs/expense-adding-dialog/expense-adding-dialog.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  collections: Collection[];
  currentCollection: Collection;
  private _currentCollectionIndex = -1;

  constructor(private authService: AuthService, private collectionsService: CollectionsService,
              private snackBars: SnackBarsService, private dialog: MatDialog) { }

  ngOnInit() {
    this.collectionsService.getCollections().subscribe(collections => {
      this.collections = collections;
      if(collections.length > 0){
        this.currentCollectionIndex = 0;
      }
    }, err => this.snackBars.open('Błąd przy pobieraniu listy kolekcji'));
  }

  get currentCollectionIndex() {return this._currentCollectionIndex;}

  set currentCollectionIndex(newValue: number) {
    console.log('SETTER');
    this._currentCollectionIndex = newValue;
    this.currentCollection = this.collections[newValue];
  }

  handleError(message: string, err?: any){
    if(err){
      console.log(err);
    }
    this.snackBars.open(message);
  }

  addCollection(name: string) {
    this.collectionsService.addCollection(name).subscribe(newCollection => {
      this.collections.push(newCollection);
      if(!this.currentCollection){
        this.currentCollectionIndex = 0;
        this.currentCollection = this.collections[this.currentCollectionIndex];
      }
    }, err => this.handleError('Dodawanie kolekcji nie powiodło się', err));
  }

  openCollectionAdding() {
    const dialogRef = this.dialog.open(AddCollectionDialogComponent, {
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(newCollectionName => {
      if(newCollectionName){
        this.addCollection(newCollectionName);
      }
    });
  }

  openExpenseAdding() {
    const collection = this.currentCollection;
    const dialogRef = this.dialog.open(ExpenseAddingDialogComponent, {
      width: '300px',
      data: {collection}
    });
    dialogRef.afterClosed().subscribe((newExpenseData: Expense) => {
      if(newExpenseData){
        this.addExpense(newExpenseData, collection);
      }
    });
  }

  addExpense(expense: Expense, collection: Collection){
    this.collectionsService.addExpense(expense, collection).subscribe(newExpense => {
      console.log(newExpense);
    }, err => this.handleError('Dodawanie wydatku nie powiodło się'));
  }

}
