import { Routes } from '@angular/router';
import { BookTableComponent } from './pages/book-table/book-table.component';
import { AboutComponent } from './pages/about/about.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';

export const routes: Routes = [
  { path: '', component: BookTableComponent },
  { path: 'sobre-el-proyecto', component: AboutComponent },
  { path: 'libro/:id', component: BookDetailComponent },
];
