import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenService } from './auth/token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`; // Replace with your API endpoint

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // Method to fetch user data
  getUserData(): Observable<any> {
    const token = this.tokenService.getAccessToken(); // Get the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Add the token to the headers

    return this.http.get<any>(`${this.apiUrl}/profile`, { headers });
  }
}