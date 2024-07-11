import { Component } from '@angular/core';
import { BookDialogComponent } from '../../components/book-dialog/book-dialog.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [BookDialogComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
