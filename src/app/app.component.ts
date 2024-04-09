import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingService } from './components/loading/loading.service';
import { CommonModule } from '@angular/common';
import { CatalogPageComponent } from './components/catalog-page/catalog-page.component';
import { NavComponent } from './components/nav/nav.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MessagesComponent } from './components/messages/messages.component';
import { MessagesService } from './components/messages/messages.service';
import { MoviesService } from './services/movies.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    LoadingComponent,
    RouterOutlet,
    CommonModule,
    CatalogPageComponent,
    NavComponent,
    MessagesComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [LoadingService, MessagesService, MoviesService],
})
export class AppComponent  {

    isMobile: boolean;

    constructor(private deviceDetectorService: DeviceDetectorService){
      this.isMobile = deviceDetectorService.isMobile();
    }

}
