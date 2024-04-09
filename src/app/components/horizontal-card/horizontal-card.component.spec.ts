import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalCardComponent } from './horizontal-card.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessagesService } from '../messages/messages.service';

describe('HorizontalCardComponent', () => {
  let component: HorizontalCardComponent;
  let fixture: ComponentFixture<HorizontalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalCardComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [MessagesService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorizontalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
