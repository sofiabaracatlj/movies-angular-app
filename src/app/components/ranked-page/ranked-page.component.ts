import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoadingComponent } from '../loading/loading.component';
import { MoviesCardListComponent } from '../movies-card-list/movies-card-list.component';
import { LoadingService } from '../loading/loading.service';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../model/movies';
import { MoviesStoreService } from '../../services/movies.store.service';
import { Genre } from '../../model/genre';

@Component({
  selector: 'app-ranked-page',
  standalone: true,
  imports: [
    LoadingComponent,
    RouterOutlet,
    CommonModule,
    MoviesCardListComponent,
    MatPaginatorModule,
  ],
  templateUrl: './ranked-page.component.html',
  styleUrl: './ranked-page.component.css',
})
export class RankedPageComponent implements OnInit {
  movies$: Observable<Movie[]> = new Observable<Movie[]>();
  genres$: Observable<Genre[]> = new Observable<Genre[]>();

  totalPages: number = 0;
  actualPage: number = 0;

  constructor(
    private moviesService: MoviesService,
    private loadingService: LoadingService,
    private movieStore: MoviesStoreService
  ) {
    this.genres$ = movieStore.getGenres();
    moviesService.totalMoviesPages$.subscribe((res) => (this.totalPages = res));
  }

  ngOnInit(): void {
    this.reloadMovies();
  }

  reloadMovies() {
    const loadingMovies$ = this.moviesService
      .getRankedMovies(this.actualPage)
      .pipe();
    this.movies$ = this.loadingService.showLoaderUntilCompleted(loadingMovies$);
  }

  handlePageChange(page: number) {
    this.actualPage = page;
    this.reloadMovies();
  }
}
