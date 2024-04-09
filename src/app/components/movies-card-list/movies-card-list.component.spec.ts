import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesCardListComponent } from './movies-card-list.component';

describe('MoviesCardListComponent', () => {
  let component: MoviesCardListComponent;
  let fixture: ComponentFixture<MoviesCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesCardListComponent, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviesCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
