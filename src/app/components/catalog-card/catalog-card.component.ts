import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Movie } from '../../model/movies';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MoviesService } from '../../services/movies.service';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { SafeUrlPipe } from '../../common/safe-url.pipe';
import { map, pipe } from 'rxjs';

@Component({
  selector: 'app-catalog-card',
  standalone: true,
  imports: [
    MatCardModule,
    MovieDialogComponent,
    CommonModule,
    MatButton,
    SafeUrlPipe,
  ],
  templateUrl: './catalog-card.component.html',
  styleUrl: './catalog-card.component.css',
})
export class CatalogCardComponent {
  @Input()
  movie: Movie | null = null;

  constructor(public dialog: MatDialog, private movieService: MoviesService) {}

  openDialog(movie: Movie | null): void {
    if (movie) {
      const dialogRef = this.dialog.open(MovieDialogComponent, {
        data: movie,
      });

      dialogRef.afterClosed().subscribe((id: number) => {
        if (id) {
          this.movieService.updateFavoriteList(id, true).subscribe();
        }
      });
    }
  }

  getDataFormat(movie: Movie) {
    let date = new Date(movie.release_date);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}
