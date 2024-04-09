import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Component, OnInit } from '@angular/core';
import {LoadingService} from './loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'loading',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  // providers: [LoadingService],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {


  constructor(public loadingService: LoadingService) {

  }

  ngOnInit() {

  }


}
