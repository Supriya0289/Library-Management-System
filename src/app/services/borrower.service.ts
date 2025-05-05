import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Borrower } from '../models/borrower.model';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BorrowerService {
   private apiUrl = `${environment.apiUrl}/borrower`;
  constructor(private api: ApiService,private http: HttpClient) { }

  // Get all borrowers
  getBorrowers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add new borrower
  addBorrower(borrower: Borrower): Observable<Borrower> {
    console.log('Sending book:', borrower);
    return this.api.post<Borrower>('borrowers', borrower);
  }

  // Get borrower by ID
  getBorrower(id: number): Observable<Borrower> {
    return this.api.get<Borrower>(`borrowers/${id}`);
  }

  // Update borrower
  updateBorrower(id: number, borrower: Borrower): Observable<Borrower> {
    return this.api.put<Borrower>('borrowers', id, borrower);
  }

  // Delete borrower
  deleteBorrower(id: number): Observable<void> {
    return this.api.delete<void>('borrowers', id);
  }

  // Search by email
  getBorrowerByEmail(email: string): Observable<Borrower> {
    return this.api.get<Borrower>(`borrowers/email/${email}`);
  }
}