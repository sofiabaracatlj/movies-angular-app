import { Genre } from './../model/genre';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../model/movies';
import { LoadingService } from '../components/loading/loading.service';
import { MoviesStoreService } from './movies.store.service';
import { MessagesService } from '../components/messages/messages.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apiUrl = 'https://api.themoviedb.org/3/';

  apiHeader = {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2MwZDIxN2U1OGNjMDJmZTMxMDhkMGIxZjZjMjI5YiIsInN1YiI6IjY2MGYyZjE1NWY0YjczMDE2M2Q0ZTE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J89__G5FY52OmpxEVLiabIbgKDFlJJsKpFUvwZQOQfA',
  };
  // private moviesSubject = new BehaviorSubject<Movie[]>([]);
  private totalPagesSubject = new BehaviorSubject<number>(0);

  // movies$: Observable<Movie[]> = this.moviesSubject.asObservable();
  totalMoviesPages$: Observable<number> = this.totalPagesSubject.asObservable();
  genres$: Observable<Genre[]> = new Observable<Genre[]>();

  constructor(
    private http: HttpClient,
    private loading: LoadingService,
    private moviesStore: MoviesStoreService,
    private messagesService: MessagesService
  ) {}

  getMovies(page: number): Observable<Movie[]> {
    return this.http
      .get<any>(`${this.apiUrl}movie/popular?language=pt-BR&page=${page + 1}`, {
        headers: this.apiHeader,
      })
      .pipe(
        shareReplay(),
        map((response) => {
          this.totalPagesSubject.next(response['total_pages']);
          let moviesList = response['results'];
          this.getGenreMovies(moviesList);
          return moviesList;
        }),
        catchError((err) => {
          const message = 'Não foi possível carregar os filmes.';
          this.messagesService.showErrors(message);
          console.log(message, err);
          return throwError(err);
        })
      );
  }

  updateFavoriteList(id: number, isFavorite: boolean): Observable<any> {
    const body = {
      media_type: 'movie',
      media_id: id,
      favorite: isFavorite,
    };
    return this.http
      .post<any>(this.apiUrl + 'account/21189360/favorite', body, {
        headers: this.apiHeader,
      })
      .pipe(
        map((res) => {
          this.getSuccessUpdatesMessage(res['status_code']);
          return res;
        }),
        catchError((err) => {
          const message = 'Erro ao adicionar aos favoritos.';
          this.messagesService.showErrors(message);
          console.log(message, err);
          return throwError(err);
        })
      );
  }

  getRankedMovies(page: number): Observable<Movie[]> {
    return this.http
      .get<any>(
        `${this.apiUrl}movie/top_rated?language=pt-BR&page=${page + 1}`,
        {
          headers: this.apiHeader,
        }
      )
      .pipe(
        shareReplay(),
        map((response) => {
          this.totalPagesSubject.next(response['total_pages']);
          let moviesList = response['results'];
          this.getGenreMovies(moviesList);
          return moviesList;
        }),
        catchError((err) => {
          const message = 'Não foi possível carregar os filmes.';
          this.messagesService.showErrors(message);
          console.log(message, err);
          return throwError(err);
        })
      );
  }

  getFavoriteList(page: number, sort: string) {
    return this.http
      .get<any>(
        `${this.apiUrl}account/21189360/favorite/movies?language=pt-BR&page=${
          page + 1
        }&sort_by=created_at.${sort}'`,
        {
          headers: this.apiHeader,
        }
      )
      .pipe(
        shareReplay(),
        map((response) => {
          this.totalPagesSubject.next(response['total_pages']);
          let moviesList = response['results'];
          this.getGenreMovies(moviesList);
          return moviesList;
        }),
        catchError((err) => {
          const message = 'Não foi possível carregar os filmes.';
          this.messagesService.showErrors(message);
          console.log(message, err);
          return throwError(err);
        })
      );
  }

  serachByName(text: string, page: number) {
    return this.http
      .get<any>(
        `${
          this.apiUrl
        }/search/movie?query=${text}&include_adult=false&language=pt-BR&page=${
          page + 1
        }`,
        {
          headers: this.apiHeader,
        }
      )
      .pipe(
        shareReplay(),
        map((response) => {
          this.totalPagesSubject.next(response['total_pages']);
          return response['results'];
        }),
        catchError((err) => {
          const message = 'Não foi possível carregar os filmes.';
          this.messagesService.showErrors(message);
          console.log(message, err);
          return throwError(err);
        })
      );
  }

  getGenreMovies(movies: Movie[]) {
    this.genres$ = this.moviesStore.getGenres();
    this.genres$.subscribe((genres) => {
      movies.map((movie) => {
        const genreList: Genre[] = [];
        movie.genre_ids.forEach((genreId) => {
          const genre = genres.find((genre) => genre.id === genreId);
          if (genre) {
            genreList.push(genre);
          }
        });
        movie.genres = genreList;
      });
    });
  }

  getSuccessUpdatesMessage(code: number) {
    let message: string = '';
    switch (code) {
      case 1:
        message = 'Adicionado a Lista de Desejos com sucesso';
        break;
      case 12:
        message = 'Filme já está na sua Lista de Desejos';
        break;
      case 13:
        message = 'Filme removido da sua Lista de Desejos';
        break;
    }
    this.messagesService.showSuccessMessages(message);
  }
}
