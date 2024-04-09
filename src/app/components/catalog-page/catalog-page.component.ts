import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoadingComponent } from '../loading/loading.component';
import { MoviesCardListComponent } from '../movies-card-list/movies-card-list.component';
import { LoadingService } from '../loading/loading.service';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../model/movies';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [
    LoadingComponent,
    RouterOutlet,
    CommonModule,
    MoviesCardListComponent,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  // providers: [MoviesService],
  templateUrl: './catalog-page.component.html',
  styleUrl: './catalog-page.component.css',
})
export class CatalogPageComponent {
  movies$: Observable<Movie[]> = new Observable<Movie[]>();

  searchFormControl = new FormControl('');

  searchText: string;

  searched: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  totalPages: number = 0;
  actualPage: number = 0;

  constructor(
    private moviesService: MoviesService,
    private loadingService: LoadingService,
    private searchService: SearchService
  ) {
    this.searchText = searchService.searchText;
    moviesService.totalMoviesPages$.subscribe((res) => (this.totalPages = res));
  }

  ngOnInit(): void {
    if (this.searchText) {
      this.searched.next(true);
      this.searchFormControl.setValue(this.searchText);
      this.searchService.cleanSearchText();
      this.searchMovie();
    } else {
      this.reloadMovies();
    }
  }

  cleanSearch() {
    this.searchService.cleanSearchText();
    this.searchFormControl.setValue('');
    this.searched.next(false);
    this.reloadMovies();
  }

  reloadMovies() {
    const loadingMovies$ = this.moviesService.getMovies(this.actualPage).pipe();
    this.movies$ = this.loadingService.showLoaderUntilCompleted(loadingMovies$);
  }

  handlePageChange(page: number) {
    this.actualPage = page;
    if (this.searchFormControl.value?.length) {
      this.searchMovie();
    } else {
      this.reloadMovies();
    }
  }

  searchMovie() {
    this.searched.next(true);
    if (this.searchFormControl.value?.length) {
      const loadingMovies$ = this.moviesService
        .serachByName(this.searchFormControl.value, this.actualPage)
        .pipe();
      this.movies$ =
        this.loadingService.showLoaderUntilCompleted(loadingMovies$);
    }
  }
}
