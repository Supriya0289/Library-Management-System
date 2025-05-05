// login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials.username, this.credentials.password)
      .subscribe({
        next: () => {
          const redirect = this.authService.isAdmin ? '/admin/dashboard' : '/user/dashboard';
          this.router.navigate([redirect]);
        },
        error: (err) => {
          this.error = err.error?.message || 'Login failed. Please check your credentials.';
        }
      });
  }
}