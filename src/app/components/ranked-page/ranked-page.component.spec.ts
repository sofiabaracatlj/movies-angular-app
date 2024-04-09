import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankedPageComponent } from './ranked-page.component';
import { HttpClientModule } from '@angular/common/http';
import { MessagesService } from '../messages/messages.service';

describe('RankedPageComponent', () => {
  let component: RankedPageComponent;
  let fixture: ComponentFixture<RankedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankedPageComponent, HttpClientModule, RouterTestingModule],
      providers: [MessagesService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RankedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
