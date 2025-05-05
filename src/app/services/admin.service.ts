// admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly API_URL = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) { }
  getAllUsersWithBorrowers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/users-with-borrowers`);
  }

  getAllUsersWithBorrowerDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/users-with-borrowers`);
  }

  updateUserRole(userId: number, role: string): Observable<any> {
    return this.http.put(`${this.API_URL}/users/${userId}/role`, { role });
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/users/${userId}`);
  }
}