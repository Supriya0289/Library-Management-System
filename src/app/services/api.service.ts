import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get<T>(path: string) {
    return this.http.get<T>(`${this.API_URL}/${path}`);
  }

  post<T>(path: string, body: any) {
    return this.http.post<T>(`${this.API_URL}/${path}`, body);
  }

  put<T>(path: string, id: number, body: any) {
    return this.http.put<T>(`${this.API_URL}/${path}/${id}`, body);
  }

  delete<T>(path: string, id: number) {
    return this.http.delete<T>(`${this.API_URL}/${path}/${id}`);
  }
}