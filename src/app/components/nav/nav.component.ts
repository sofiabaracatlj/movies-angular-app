import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute, NavigationEnd, EventType } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  actualPage: string = '';
  pageEmitter: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    router.events.subscribe((res) => {
      if(res.type == EventType.NavigationEnd){
        this.pageEmitter.next(res.url.replace('/', ''));
      }
    });
  }
  ngOnInit() {
    
  }

  @Input()
  isMobile: boolean = false;

  goToPage(page: string) {
    
    this.router.navigate([page]);
  }
}
