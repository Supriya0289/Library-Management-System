import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userData: { username: string; password: string; name: string; email: string } = {
    username: '',
    password: '',
    name: '',
    email: ''
  };

  error: string = '';
  success: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register(): void {
    const { username, password, name, email } = this.userData;

    // Validate form inputs
    if (!username || !password || !name || !email) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.success = false;

    this.authService.register(this.userData).pipe(
      catchError((err) => {
        this.error = err.error?.message || err.message || 'Registration failed. Please try again.';
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: (response: any) => {
        if (response) {
          this.success = true;
          setTimeout(() => this.router.navigate(['/login']), 2000);
        }
      }
    });
  }
}
