import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { expect, jest, test } from '@jest/globals';
import { take } from 'rxjs';
import { MessagesService } from '../components/messages/messages.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let controller: HttpTestingController; // <-- we declare the controller

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MessagesService]
    });
  });

  beforeEach((): void => {
    service = TestBed.inject(MoviesService);
    controller = TestBed.inject(HttpTestingController); // <-- we inject testing instance
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMovies', () => {
    it('get a lis of movies ', () => {
      service
        .getMovies(0)
        .pipe(take(1))
        .subscribe((res) => {
          expect(res.length).toEqual(1);
          expect(res[0]).toEqual({});
        });

      const request: TestRequest = controller.expectOne({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1',
      });

      request.flush([{}]); // <-- this is how our response body will look like, an array with one empty object
    });
  });
});
