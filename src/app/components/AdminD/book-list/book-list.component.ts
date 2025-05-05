// book-list.component.ts
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoanService } from '../../../services/loan.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  isAdmin = false;
  isLoading = true;
  error: string | null = null;

  constructor(
    private bookService: BookService,
    public authService: AuthService,
    private router: Router,
    private loanService: LoanService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin;
    this.loadBooks();
  }

  loadBooks() {
    this.isLoading = true;
    this.error = null;
    
    this.bookService.getAllBooks().subscribe({
      next: (books) => {
        console.log("ddd",books);
        this.books = books;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading books:', err);
        this.error = 'Failed to load books. Please try again.';
        this.isLoading = false;
        
        if (err.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
    });
  }

  checkoutBook(bookId: number) {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/login']);
      return;
    }

    const userId = this.authService.currentUserValue?.userId;
    if (!userId) {
      this.error = 'Borrower information not found';
      return;
    }

    this.loanService.checkoutBook(bookId, userId).subscribe({
      next: () => {
        alert('Book checked out successfully!');
        this.loadBooks(); // Refresh the list
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to checkout book';
        console.error('Checkout error:', err);
      }
    });
  }

  deleteBook(id: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => this.loadBooks(),
        error: (err) => {
          alert('Failed to delete book');
          console.error('Delete error:', err);
        }
      });
    }
  }
}