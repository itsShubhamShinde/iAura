import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api'; 
  private token: string | null = null;  // Store token in memory

  constructor(private http: HttpClient) {}

  // Register User
  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, user);
  }

  // Login User
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

  // Get Expenses
  getExpenses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/expenses/expenses`, this.getAuthHeaders());
  }

  // Add Expense
  addExpense(expense: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/expenses/add-expense`, expense, this.getAuthHeaders());
  }

  // Update Expense
  updateExpense(id: string, expense: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/expenses/expenses/${id}`, expense, this.getAuthHeaders());
  }

  // Delete Expense
  deleteExpense(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/expenses/expenses/${id}`, this.getAuthHeaders());
  }

  // Set token in memory
  setToken(token: string | null): void {
    this.token = token;
  }

  // Get token from memory
  getToken(): string | null {
    return this.token;
  }

  // Get Authorization Headers
  private getAuthHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    };
  }
}
