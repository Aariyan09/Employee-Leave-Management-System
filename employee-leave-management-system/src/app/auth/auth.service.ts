import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../shared/loader.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7134/api/auth'; // Adjust API URL
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_ID_KEY = 'user_id';

  constructor(private http: HttpClient,private loaderService:LoaderService,private router:Router) { }

  login(email: string, password: string): Observable<any> {
    this.loaderService.show(); // Show loader before API call
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      finalize(() => this.loaderService.hide()) // Hide loader after API call
    );;
  }

  register(name: string, email: string, password: string): Observable<any> {
    this.loaderService.show(); // Show loader before API call
    return this.http.post(`${this.apiUrl}/register`, { name, email, password }).pipe(
      finalize(() => this.loaderService.hide()) // Hide loader after API call
    );;
  }

  saveAuthData(token: string, userId: number): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_ID_KEY, userId.toString());
  }

  getUserId(): string | null {
    return localStorage.getItem(this.USER_ID_KEY);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.role || null;
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_ID_KEY);
    this.router.navigate(['/auth/login']);
  }

}
