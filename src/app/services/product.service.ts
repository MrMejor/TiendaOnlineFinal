import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // private apiUrl = `${environment.apiUrl}/products`;
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  // Add a new product
  addProduct(product: any): Observable<any> {
    const token = localStorage.getItem('token'); // Get the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Add the token to the headers
    });
    return this.http.post(`${ this.apiUrl }/create`, product, { responseType: 'text' });
  }

  // Fetch products by user
  getProductsByUser(username: string): Observable<any> {
    const token = localStorage.getItem('token'); // Get the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Add the token to the headers
    });
    return this.http.get(`${this.apiUrl}/users/${username}`, { headers });
  }

    // Fetch all products from the backend
    getProducts(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }
  
    // product.service.ts
    getProductById(productId: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${productId}`); // Fetch a single product by ID
    }
  
  // Delete
  deleteProduct(productId: string): Observable<any> {
    const token = localStorage.getItem('token'); // Get the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Add the token to the headers
    });
    return this.http.delete(`${this.apiUrl}/${productId}`, { headers, responseType: 'text' });
  }
}