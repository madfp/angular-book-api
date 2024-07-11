import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Book, BookReponse } from '../../interface/response';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}
  // metodo para obtener todos los libros
  getBooks(page: number): Observable<BookReponse> {
    return this.http
      .get<BookReponse>(`https://gutendex.com/books/`, {
        params: new HttpParams().set('page', page),
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';

          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error}`;
          } else {
            errorMessage = `Error code: ${error.status}, message: ${error.message}`;
          }
          return throwError(() => errorMessage);
        })
      );
  }

  // metodo para obtener un libro individual
  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`https://gutendex.com/books/${id}/`).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error}`;
        } else {
          errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }
        return throwError(() => errorMessage);
      })
    );
  }

  getFilteredBook(
    title: string | undefined,
    birth_year: null | number | undefined,
    death_year: null | number | undefined
  ): Observable<BookReponse> {
    return this.http.get<BookReponse>(`https://gutendex.com/books/`).pipe(
      // filter the response
      map((response: BookReponse) => {
        let filteredBooks: any = response.results.filter((book: Book) => {
          let match = false;

          // en caso de que se haya ingresado el titulo, filtrar ese campo
          if (
            title &&
            title != '' &&
            book.title.toLowerCase().includes(title.toLowerCase())
          ) {
            match = true;
          }

          // filtrar por los años de nacimiento y muerte de los autores
          for (const author of book.authors) {
            // nacimiento
            if (birth_year && author.birth_year) {
              if (author.birth_year === birth_year) {
                match = true;
              }
            }

            // muerte
            if (death_year && author.death_year) {
              if (author.death_year == death_year) {
                match = true;
              }
            }
          }

          return match;
        });
        response.results = filteredBooks;
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error}`;
        } else {
          errorMessage = `Error code: ${error.status}, message: ${error.message}`;
        }
        return throwError(() => errorMessage);
      })
    );
  }
}
