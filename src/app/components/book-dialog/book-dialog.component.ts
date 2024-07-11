import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-book-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './book-dialog.component.html',
  styleUrl: './book-dialog.component.css',
})
export class BookDialogComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
