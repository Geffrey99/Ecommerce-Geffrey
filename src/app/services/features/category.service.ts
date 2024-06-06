import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interface/Product';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
 private baseUrl = 'http://localhost:8081/api/categories'; // Asegúrate de que la URL sea correcta

  constructor(private http: HttpClient) { }

  // ... tus otros métodos ...




  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/by-category/${categoryId}`);
  }
}