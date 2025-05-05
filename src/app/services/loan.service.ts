import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private readonly API_URL = `${environment.apiUrl}/loans`;

  constructor(private http: HttpClient) { }

  getAllLoans(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  getUserLoans(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/user/${username}`);
  }

  checkoutBook(bookId: number, userId: number): Observable<any> {
    const body = {
      bookId,
      userId
    }
    return this.http.post(`${this.API_URL}/checkout`, body);
  }

  returnBook(loanId: number): Observable<any> {
    return this.http.put(`${this.API_URL}/${loanId}/return`, {});
  }

  getActiveLoans(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/active`);
  }

  getOverdueLoans(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/overdue`);
  }
  // loan.service.ts
getLoansByUserId(userId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.API_URL}/user-id/${userId}`);
}
}