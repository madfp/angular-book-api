import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../core/services/book.service';
import { Book } from '../../interface/response';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [ErrorMessageComponent, AsyncPipe, ButtonModule, RouterLink],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css',
})
export class BookDetailComponent {
  // id que se encuentra en los parametros de la URL
  id!: any;

  // observable con los resultados de la peticion
  bookResult$!: Observable<Book>;

  // mensaje de error en caso de que la peticion falle
  errorMessage!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit() {
    // Obteniendo el id de la URL
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // haciendo la peticion con el id
    this.getIndividualBook();
  }

  getIndividualBook() {
    this.bookResult$ = this.bookService.getBookById(this.id).pipe(
      catchError((error: string) => {
        this.errorMessage = error;
        return EMPTY;
      })
    );
  }
}
