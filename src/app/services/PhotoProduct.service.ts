import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PhotoProductService {


    private apiUrl = 'http://localhost:8081/api/product-images'; // Reemplaza esto con la URL de tu backend

  constructor(private http: HttpClient) { }

  addProductImage(productId: number, image: File) {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post(`${this.apiUrl}/add?productId=${productId}`, formData);

  }
}