import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../routes';
import {User} from './auth.service';
import {Observable} from 'rxjs';

export interface Collection {
  id: number;
  name: string;
  owner: User;
}

export interface Expense {
  id: number;
  description: string;
  value: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  constructor(private http: HttpClient) { }

  getCollections() {
    return this.http.get(API.COLLECTIONS) as Observable<Collection[]>;
  }

  addCollection(name: string){
    return this.http.post(API.COLLECTIONS, {name: name}) as Observable<Collection>;
  }

  collectionExists(name: string){
    return this.http.get(API.COLLECTION_EXISTS(name)) as Observable<boolean>;
  }

  addExpense(expense: Expense, collection: Collection){
    console.log(expense);
    return this.http.post(API.EXPENSES(collection.id), expense) as Observable<Expense>;
  }

}
