import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../../model/message';
import { tap } from 'rxjs/operators';
import { MessagesService } from './messages.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'messages',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  showMessages = false;
  showErrorMessages = false;

  errors$: Observable<string[]> = new Observable<string[]>();
  successMessages$: Observable<string[]> = new Observable<string[]>();

  constructor(public messagesService: MessagesService) {}

  ngOnInit() {
    this.errors$ = this.messagesService.errors$.pipe(
      tap(() => (this.showErrorMessages = true))
    );

    this.successMessages$ = this.messagesService.successMessages$.pipe(
      tap(() => (this.showMessages = true))
    );
  }

  onClose() {
    this.showMessages = false;
  }
  onCloseError() {
    this.showErrorMessages = false;
  }
}
