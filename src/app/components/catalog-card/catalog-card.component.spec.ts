import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogCardComponent } from './catalog-card.component';
import { HttpClientModule } from '@angular/common/http';
import { MessagesService } from '../messages/messages.service';

describe('CatalogCardComponent', () => {
  let component: CatalogCardComponent;
  let fixture: ComponentFixture<CatalogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogCardComponent, HttpClientModule],
      providers: [MessagesService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
