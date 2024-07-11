import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { catchError, EMPTY, Observable, map, filter } from 'rxjs';
import { BookService } from '../../core/services/book.service';
import { BookReponse } from '../../interface/response';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { LoaderComponent } from '../../components/loader/loader.component';
import { BookDialogComponent } from '../../components/book-dialog/book-dialog.component';
import { RouterLink } from '@angular/router';

import {
  Validators,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-book-table',
  standalone: true,
  imports: [
    AsyncPipe,
    ErrorMessageComponent,
    TableModule,
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    TooltipModule,
    LoaderComponent,
    BookDialogComponent,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './book-table.component.html',
  styleUrl: './book-table.component.css',
})
export class BookTableComponent implements OnInit {
  // Respuesta de la peticion
  public bookResults$!: Observable<BookReponse>;
  public filteredResults$!: Observable<any>;

  // Mensaje de error
  public errorMessage!: string;

  // construccion del formulario para hacer el filtro de libros
  fb = inject(NonNullableFormBuilder);
  form = this.fb.group({
    title: [''],
    birthDate: [null],
    deathDate: [null],
  });

  // Variables usadas para la peticion paginada de la api
  first = 1; // Pagina actual
  rows = 32; // Cantidad de resultados por pagina

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.callService();
  }

  // get Books
  callService() {
    if (
      this.form.value.birthDate ||
      this.form.value.deathDate ||
      this.form.value.title
    ) {
      this.bookResults$ = this.bookService
        .getFilteredBook(
          this.form.value.title,
          this.form.value.birthDate,
          this.form.value.deathDate
        )
        .pipe(
          catchError((error: string) => {
            this.errorMessage = error;
            return EMPTY;
          })
        );
    } else {
      this.bookResults$ = this.bookService.getBooks(this.first).pipe(
        catchError((error: string) => {
          this.errorMessage = error;
          return EMPTY;
        })
      );
    }
  }

  next() {
    this.first = this.first + 1;
    this.callService();
  }

  prev() {
    this.first = this.first - 1;
    this.callService();
  }

  reset() {
    this.first = 1;
  }

  pageChange(event: { first: number; rows: number }) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
