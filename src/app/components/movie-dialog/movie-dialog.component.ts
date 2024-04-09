import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { Movie } from '../../model/movies';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, CommonModule],
  providers: [DeviceDetectorService],
  templateUrl: './movie-dialog.component.html',
  styleUrl: './movie-dialog.component.css',
})
export class MovieDialogComponent {
  movie: Movie;

  isMobile: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) movie: Movie,
    private dialogRef: MatDialogRef<MovieDialogComponent>,
    private deviceDetector: DeviceDetectorService
  ) {
    this.isMobile = deviceDetector.isMobile();
    this.movie = movie;
  }

  close(id?: number) {
    this.dialogRef.close(id);
  }
}
