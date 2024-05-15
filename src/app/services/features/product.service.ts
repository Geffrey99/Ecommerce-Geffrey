import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from './Product'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  addProductImage(productId: number, selectedFile: any) {
    throw new Error('Method not implemented.');
  }

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


  // createProduct(product: any, file: File): Observable<Product> {
  //   const formData = new FormData();
    
  //   // Agregar los datos del producto al FormData
  //   Object.keys(product).forEach(key => {
  //     formData.append(key, product[key]);
  //   });
  
  //   // Agregar el archivo al FormData
  //   formData.append('photo', file);
  
  //   const createUrl = `${this.apiUrl}/create`;
  //   return this.http.post<Product>(createUrl, formData);
  // }
  // createProduct(product: Product): Observable<Product> {
  //   const createUrl = `${this.apiUrl}/create`;
  //   return this.http.post<Product>(createUrl, product);


  // createProduct(product: Product, photo: File): Observable<Product> {
  //   const formData = new FormData();
  
  //   if (product.description !== undefined) {
  //     formData.append('description', product.description);
  //   }
    
  //   if (product.name !== undefined) {
  //     formData.append('name', product.name);
  //   }
    
  //   if (product.price !== undefined) {
  //     formData.append('price', String(product.price));
  //   }
    
  //   if (product.stock !== undefined) {
  //     formData.append('stock', String(product.stock));
  //   }
    
  //   if (product.category?.id) {
  //     formData.append('category_id', String(product.category.id));
  //   }
  //   formData.append('photo', photo);
  //   const createUrl = `${this.apiUrl}/create`;
  //   return this.http.post<Product>(createUrl, formData);
  // }



  createProduct(product: Product): Observable<Product> {
    const createUrl = `${this.apiUrl}/create`;
    return this.http.post<Product>(createUrl, product);
  }

}
 

