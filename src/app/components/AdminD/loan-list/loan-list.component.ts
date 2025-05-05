// loan-list.component.ts
import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../../services/loan.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-loans',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {
  loans: any[] = [];
  isLoading = true;
  error: string | null = null;
  currentView: 'active' | 'overdue' = 'active';

  constructor(private loanService: LoanService) {}

  ngOnInit() {
    this.loadLoans();
  }

  loadLoans() {
    this.isLoading = true;
    this.error = null;

    const loanObservable = this.currentView === 'active' 
      ? this.loanService.getActiveLoans()
      : this.loanService.getOverdueLoans();

    loanObservable.subscribe({
      next: (loans) => {
        this.loans = loans;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading loans:', err);
        this.error = 'Failed to load loans';
        this.isLoading = false;
      }
    });
  }

  switchView(view: 'active' | 'overdue') {
    this.currentView = view;
    this.loadLoans();
  }

  markReturned(loanId: number) {
    if (confirm('Mark this book as returned?')) {
      this.loanService.returnBook(loanId).subscribe({
        next: () => {
          alert('Book marked as returned');
          this.loadLoans();
        },
        error: (err) => {
          console.error('Error returning book:', err);
          alert('Failed to mark book as returned');
        }
      });
    }
  }
}