import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoadingComponent } from '../loading/loading.component';
import { MoviesCardListComponent } from '../movies-card-list/movies-card-list.component';
import { LoadingService } from '../loading/loading.service';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../model/movies';
import { MoviesStoreService } from '../../services/movies.store.service';
import { Genre } from '../../model/genre';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HorizontalCardComponent } from '../horizontal-card/horizontal-card.component';

@Component({
  selector: 'app-favorite-page',
  standalone: true,
  imports: [
    LoadingComponent,
    RouterOutlet,
    CommonModule,
    MoviesCardListComponent,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    HorizontalCardComponent,
  ],
  templateUrl: './favorite-page.component.html',
  styleUrl: './favorite-page.component.css',
})
export class FavoritePageComponent {
  movies$: Observable<Movie[]> = new Observable<Movie[]>();
  genres$: Observable<Genre[]> = new Observable<Genre[]>();

  sort: string = 'desc';
  sortEmitter$ = new BehaviorSubject<string>(this.sort);

  totalPages: number = 0;
  actualPage: number = 0;

  constructor(
    private moviesService: MoviesService,
    private loadingService: LoadingService,
    private movieStore: MoviesStoreService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.genres$ = movieStore.getGenres();
    moviesService.totalMoviesPages$.subscribe((res) => (this.totalPages = res));
  }

  handleSort(sort: string) {
    sort = sort;
    this.sortEmitter$.next(sort);
    this.changeDetectorRef.markForCheck();
    this.reloadMovies(sort);
  }

  ngOnInit(): void {
    this.reloadMovies(this.sort);
  }

  reloadMovies(sort: string) {
    const loadingMovies$ = this.moviesService
      .getFavoriteList(this.actualPage, sort)
      .pipe();
    this.movies$ = this.loadingService.showLoaderUntilCompleted(loadingMovies$);
  }

  handlePageChange(page: number) {
    this.actualPage = page;
    this.reloadMovies(this.sort);
  }
}
