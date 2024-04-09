import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchText: string = '';

  constructor() {}

  addSearchText(text: string) {
    this.searchText = text;
  }

  cleanSearchText() {
    this.searchText = '';
  }
}
