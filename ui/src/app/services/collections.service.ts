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

}
