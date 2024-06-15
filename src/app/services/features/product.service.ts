import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from '../../interface/Product'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8081/api/products'; 

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    const recuperaTodos = `${this.apiUrl}/todos`;
    return this.http.get<Product[]>(recuperaTodos).pipe(
      catchError(error => {
        console.error('Error al obtener productos:', error);
        return throwError('Error al obtener productos');
      })
    );
  }

  getProductById(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.get<Product>(url);
  }
  
  createProduct(product: Product): Observable<Product> {
    const createUrl = `${this.apiUrl}/create`;
    return this.http.post<Product>(createUrl, product);
  }

  updateProduct(id:number, formData: FormData): Observable <any> {
    return this.http.put(`${this.apiUrl}/editar/${id}`, formData);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`).pipe(
      catchError(error => {
        console.error('Error al eliminar el producto:', error);
        return throwError('Error al eliminar el producto');
      })
    );
  }
}


