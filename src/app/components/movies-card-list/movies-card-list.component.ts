import { LoadingService } from './../loading/loading.service';
import { Movie } from '../../model/movies';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CatalogCardComponent } from '../catalog-card/catalog-card.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EventEmitter } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HorizontalCardComponent } from '../horizontal-card/horizontal-card.component';

@Component({
  selector: 'app-movies-card-list',
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
    CommonModule,
    CatalogCardComponent,
    MatPaginator,
    HorizontalCardComponent,
  ],
  templateUrl: './movies-card-list.component.html',
  styleUrl: './movies-card-list.component.css',
})
export class MoviesCardListComponent implements AfterViewInit, OnInit {
  @Output()
  changePageEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  moviesList: Movie[] | null = [];

  @Input()
  totalPages: number = 1;

  @Input()
  actualPage: number = 0;

  itensPerPage: number = 20;

  @ViewChild('gridView') gridView: any;
  columnNum = 0;
  rowHeight = 360;
  tileSize = 200;

  isCatalog: boolean = true;

  constructor(
    private route: ActivatedRoute,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.isCatalog = this.route.routeConfig?.path == '' ? true : false;
    this.setRowHeight();
  }

  setRowHeight() {
    if (!this.isCatalog) {
      this.rowHeight = 144;
    }
  }

  ngAfterViewInit() {
    // this.setColNum();
  }

  setColNum() {
    if (this.isCatalog) {
      let width = this.gridView?._element.nativeElement.offsetWidth;
      return Math.trunc(width / this.tileSize);
    } else return 1;
  }

  handlePageChange(event: PageEvent) {
    const page = event.pageIndex;
    this.changePageEvent.emit(page);
  }
}
