import {Component, Inject, OnInit} from '@angular/core';
import {AddCollectionDialogComponent} from '../add-collection-dialog/add-collection-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Collection, CollectionsService, Expense} from '../../services/collections.service';
import * as moment from 'moment';

export interface ExpenseAddingData {
  collection: Collection;
}

const dateFormat = 'YYYY-MM-DD';

@Component({
  selector: 'app-expense-adding-dialog',
  templateUrl: './expense-adding-dialog.component.html',
  styleUrls: ['./expense-adding-dialog.component.scss']
})
export class ExpenseAddingDialogComponent implements OnInit {
  description: string;
  value: number;
  date: string;

  constructor(public dialogRef: MatDialogRef<AddCollectionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ExpenseAddingData) { }

  ngOnInit() {
  }

  addExpense(){
    this.dialogRef.close({description: this.description, value: this.value, date: moment(this.date).format(dateFormat)} as Expense);
  }

  close(){
    this.dialogRef.close(null);
  }


}
