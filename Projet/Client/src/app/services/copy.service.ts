import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';

import { Copy } from '../model/copy';
import { Book } from '../model/book';
import { BaseHttpService } from './baseHttpService';

@Injectable()
export class CopyService extends BaseHttpService {
  getAvailable(bookId: string): Observable<Copy[]> {
    return this.http
      .get<Copy[]>(`${this.baseUrl}/books/${bookId}/availableCopies`);

  }

  getAll(bookId: string): Observable<Copy[]> {
    return this.http
      .get<Copy[]>(`${this.baseUrl}/books/${bookId}/copies`);
  }

  getBook(copyId: string): Observable<Book> {
    return this.http
      .get<Book>(`${this.baseUrl}/books/copies/${copyId}`);
  }
}
