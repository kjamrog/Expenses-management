import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Collection, CollectionsService} from '../services/collections.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  collections: Collection[];

  constructor(private authService: AuthService, private collectionsService: CollectionsService) { }

  ngOnInit() {
    this.collectionsService.getCollections().subscribe(collections => {
      this.collections = collections;
    });
  }

  test() {
    this.collectionsService.addCollection('Test collection').subscribe(newCollection => {
      this.collections.push(newCollection);
    });
  }

}
