// book-catalog.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../../services/book.service';
import { LoanService } from '../../../services/loan.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-book-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-catalog.component.html',
  styleUrls: ['./book-catalog.component.css']
})
export class BookCatalogComponent implements OnInit {
  books: any[] = [];
  loading = true;

  constructor(
    private bookService: BookService,
    private loanService: LoanService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading books:', err);
        this.loading = false;
      }
    });
  }

  borrowBook(bookId: number) {
    if (!this.authService.currentUserValue) {
      alert('Please login to borrow books');
      return;
    }

    if (confirm('Are you sure you want to borrow this book?')) {
      this.loanService.checkoutBook(bookId, this.authService.currentUserValue.id)
        .subscribe({
          next: () => {
            alert('Book borrowed successfully!');
            this.loadBooks();
          },
          error: (err) => {
            alert('Failed to borrow book: ' + (err.error?.message || err.message));
          }
        });
    }
  }
}