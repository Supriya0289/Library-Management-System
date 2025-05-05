// user-management.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  isLoading = true;
  error: string | null = null;
  expandedUserId: number | null = null;

  constructor(
    private adminService: AdminService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUsersWithBorrowers();
  }
  loadUsersWithBorrowers() {
    this.adminService.getAllUsersWithBorrowers().subscribe({
      next: (users) => {
        this.users = users;
        console.log('Users with borrowers:', users); // Debug log
      },
      error: (err) => console.error('Error loading users:', err)
    });
  }


 

 

  // In your UserManagementComponent class
getActiveLoansCount(loans: any[] | undefined): number {
  if (!loans) return 0;
  return loans.filter(loan => loan?.status === 'ACTIVE').length;
}

  toggleBorrowerDetails(userId: number) {
    this.expandedUserId = this.expandedUserId === userId ? null : userId;
  }

  updateRole(userId: number, role: string) {
    this.adminService.updateUserRole(userId, role).subscribe({
      next: () => this.loadUsersWithBorrowers(),
      error: (err) => alert('Failed to update role')
    });
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(userId).subscribe({
        next: () => this.loadUsersWithBorrowers(),
        error: (err) => alert('Failed to delete user')
      });
    }
  }
}