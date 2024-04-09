import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDialogComponent } from './movie-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessagesService } from '../messages/messages.service';

describe('MovieDialogComponent', () => {
  let component: MovieDialogComponent;
  let fixture: ComponentFixture<MovieDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        MessagesService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
