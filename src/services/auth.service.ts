
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private userService: UserService,private router: Router) { }

  register(name: string, email: string, password: string, role: string) {
    this.http.post<{ token: string }>(`${this.baseUrl}/register`, { name, email, password, role }).subscribe(
      data => {
        this.login(email, password);
      },
      error => {
        console.error('Registration failed', error);
      }
    );
  }

  login(email: string, password: string) {
    this.http.post<any>(this.baseUrl + '/login', { email, password }).subscribe(data => {
      if (data.token) {
        sessionStorage.setItem('token', data.token);
        const u  =this.userService.getById(data.userId).subscribe(
          user => {
            console.log(user);
            this.userService.setUser(user);
          });
  
      }
    },
      (error) => {
        console.error('Login failed', error);
      });
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');;
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // פענוח הטוקן
      return payload.role || null;
    } catch (e) {
      console.error('שגיאה בפענוח הטוקן', e);
      return null;
    }
  }

  isTeacher(): boolean {
    return this.getUserRole() === 'teacher';
  }
  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

}

