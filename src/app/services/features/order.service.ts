import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private http: HttpClient) { }
  
  private baseUrl = 'http://localhost:8081/api/orders';
  createOrder(userId: number, orderDetails: any[]): Observable<any> {
    const url = `${this.baseUrl}/create?userId=${userId}`;
    return this.http.post(url, orderDetails);
  }

  getAllOrdersByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`);
  }

  getOrderDetails(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${orderId}/details`);
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    const params = new HttpParams().set('status', status);
  return this.http.put<any>(`${this.baseUrl}/${orderId}/status`, null, { params });
}

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

}
