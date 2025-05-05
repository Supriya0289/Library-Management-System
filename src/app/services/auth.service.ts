// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // auth.service.ts
register(userData: any): Observable<any> {
  return this.http.post(`${environment.apiUrl}/auth/register`, userData).pipe(
    catchError(error => {
      // Handle specific error cases if needed
      if (error.status === 400) {
        throw new Error('Username or email already exists');
      }
      throw new Error('Registration failed. Please try again.');
    })
  );
}
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('currentUser');
    if (user && token) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<{token: string, role: string, userId: number}>(`${environment.apiUrl}/auth/login`, { username, password })
      .pipe(
        tap(response => {
          // Store both token and user details
          localStorage.setItem('access_token', response.token);
          localStorage.setItem('user_role', response.role);
          localStorage.setItem('currentUser', JSON.stringify({
            username,
            userId: response.userId,
            role: response.role
          }));
          this.currentUserSubject.next({
            username,
            userId: response.userId,
            role: response.role
          });
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  logout() {
    // Clear all auth-related items
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  get isAdmin(): boolean {
    const user = this.currentUserValue;
    return user?.role === 'ADMIN';
  }

  get isAuthenticated(): boolean {
    return !!this.getToken();
  }
}