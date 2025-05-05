// admin-loan-list.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { LoanService } from '../../../services/loan.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-loans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-loan-list.component.html',
  styleUrls: ['./admin-loan-list.component.css']
})
export class AdminLoanListComponent implements OnInit {
  @Input() userId?: number;
  loans: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private loanService: LoanService) {}

  ngOnInit() {
    if (this.userId) {
      this.loadUserLoans(this.userId);
    }
  }

  loadUserLoans(userId: number) {
    this.isLoading = true;
    this.error = null;

    this.loanService.getLoansByUserId(userId).subscribe({
      next: (loans) => {
        this.loans = loans;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading loans:', err);
        this.error = 'Failed to load user loans';
        this.isLoading = false;
      }
    });
  }

  returnBook(loanId: number) {
    if (confirm('Are you sure you want to mark this book as returned?')) {
      this.loanService.returnBook(loanId).subscribe({
        next: () => {
          alert('Book marked as returned');
          if (this.userId) {
            this.loadUserLoans(this.userId);
          }
        },
        error: (err) => {
          console.error('Error returning book:', err);
          alert('Failed to mark book as returned');
        }
      });
    }
  }
}