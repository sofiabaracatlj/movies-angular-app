import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../model/movies';
import { LoadingService } from '../components/loading/loading.service';
import { Genre } from '../model/genre';

@Injectable({
  providedIn: 'root',
})
export class MoviesStoreService {
  apiUrl = 'https://api.themoviedb.org/3/';

  apiHeader = {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2MwZDIxN2U1OGNjMDJmZTMxMDhkMGIxZjZjMjI5YiIsInN1YiI6IjY2MGYyZjE1NWY0YjczMDE2M2Q0ZTE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J89__G5FY52OmpxEVLiabIbgKDFlJJsKpFUvwZQOQfA',
  };
  private genreSubject = new BehaviorSubject<Genre[]>([]);

  genres$: Observable<Genre[]> = this.genreSubject.asObservable();
  // totalMoviesPages$: Observable<number> = this.totalPagesSubject.asObservable();

  constructor(private http: HttpClient, private loading: LoadingService) {
    this.getGenresList();
  }


  private getGenresList(){
    return this.http
    .get<any>(`${this.apiUrl}genre/movie/list?language=pt`, {
      headers: this.apiHeader,
    })
    .pipe(
      shareReplay(),
      map((response) => {
        return response['genres'];
      }),
      catchError((err) => {
        const message = 'Não foi possível carregar os filmes.';
        // this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap((genreList) => {
        this.genreSubject.next(genreList);
      })
    ).subscribe();
  }

  getGenres(): Observable<Genre[]> {
    return this.genres$.pipe();
  }
}
