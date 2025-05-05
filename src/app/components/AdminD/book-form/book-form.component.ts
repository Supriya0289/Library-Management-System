// book-form.component.ts
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  book: any = {
    title: '',
    author: '',
    isbn: '',
    availableCopies: 0,
    publishedYear: new Date().getFullYear(),
    description: ''
  };
  isEdit = false;
  isLoading = false;
  error: string | null = null;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.isLoading = true;
      this.bookService.getBookById(+id).subscribe({
        next: (book) => {
          this.book = book;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading book:', err);
          this.error = 'Failed to load book details';
          this.isLoading = false;
        }
      });
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.error = null;

    const operation = this.isEdit 
      ? this.bookService.updateBook(this.book.id, this.book)
      : this.bookService.addBook(this.book);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/admin/books']);
      },
      error: (err) => {
        console.error('Operation failed:', err);
        this.error = this.isEdit ? 'Failed to update book' : 'Failed to add book';
        this.isLoading = false;
      }
    });
  }
}