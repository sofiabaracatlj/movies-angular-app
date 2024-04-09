import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogPageComponent } from './catalog-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessagesService } from '../messages/messages.service';

describe('CatalogPageComponent', () => {
  let component: CatalogPageComponent;
  let fixture: ComponentFixture<CatalogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogPageComponent, HttpClientTestingModule, RouterTestingModule, BrowserAnimationsModule],
      providers: [MessagesService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
