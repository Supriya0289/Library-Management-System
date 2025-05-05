// user-loan-list.component.ts
import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../../services/loan.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BorrowerService } from '../../../services/borrower.service';

@Component({
  selector: 'app-my-loans',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-loan-list.component.html',
  styleUrls: ['./user-loan-list.component.css']
})
export class UserLoanListComponent implements OnInit {
deleteBook(arg0: any) {
throw new Error('Method not implemented.');
}
  borrowers: any[] = [];
  isLoading = true;
  isAdmin = false;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private borrowerService: BorrowerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin;
    this.loadBorrowers();
  }

  loadBorrowers() {
    this.isLoading = true;
    this.error = null;
    
    this.borrowerService.getBorrowers().subscribe({
      next: (borrower) => {
        console.log("ddd",borrower);
        this.borrowers = borrower;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading borrowers:', err);
        this.error = 'Failed to load borrowers. Please try again.';
        this.isLoading = false;
        
        if (err.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
    });
  }
  

 
}