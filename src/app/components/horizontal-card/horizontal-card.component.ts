import { LoadingService } from './../loading/loading.service';
import { SearchService } from './../../services/search.service';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Movie } from '../../model/movies';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { NestedEllipsisModule } from 'ngx-nested-ellipsis';
import { SafeUrlPipe } from '../../common/safe-url.pipe';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-horizontal-card',
  standalone: true,
  imports: [
    MatCardModule,
    MovieDialogComponent,
    CommonModule,
    MatButton,
    SafeUrlPipe,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './horizontal-card.component.html',
  styleUrl: './horizontal-card.component.css',
})
export class HorizontalCardComponent {
  isRankedPage: boolean = false;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private movieService: MoviesService,
    private loadingService: LoadingService
  ) {
    this.isRankedPage = activatedRoute.routeConfig?.path == 'ranking';
  }

  @Input()
  movie: Movie | null = null;

  @Input()
  position: number | null = null;

  searchInCatalog(movie: Movie) {
    this.router.navigate(['']);
    this.searchService.addSearchText(movie.title);
  }

  async revomeFavoriteMovie(movie: Movie) {
    this.loadingService.loadingOn();
    await this.movieService.updateFavoriteList(movie.id, false).subscribe(res=>{
      this.loadingService.loadingOff()
    });
    window.location.reload();
  }
}
