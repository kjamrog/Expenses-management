import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CollectionsService} from '../../services/collections.service';
import {SnackBarsService} from '../../services/snackbars.service';

@Component({
  selector: 'app-add-collection-dialog',
  templateUrl: './add-collection-dialog.component.html',
  styleUrls: ['./add-collection-dialog.component.scss']
})
export class AddCollectionDialogComponent implements OnInit {
  name: string;

  constructor(public dialogRef: MatDialogRef<AddCollectionDialogComponent>, @Inject(MAT_DIALOG_DATA) data: any,
              private collectionsService: CollectionsService, private snackBars: SnackBarsService) { }

  ngOnInit() {
  }

  addCollection(){
    this.collectionsService.collectionExists(this.name).subscribe(exists => {
      if(exists){
        return this.snackBars.open('Kolekcja o tej nazwie już istnieje');
      }
      this.dialogRef.close(this.name);
    });
  }

  close() {
    this.dialogRef.close(null);
  }

}
