import { Component } from '@angular/core';
import { OrderService } from '../../services/features/order.service';
import { LoginService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-detalles-compras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles-compras.component.html',
  styleUrl: './detalles-compras.component.css'
})
export class DetallesComprasComponent {
  userId: number | undefined;
  orders: any[] = [];
  selectedOrderDetails: any | undefined;
  orderDetails: any | undefined;

  constructor(private orderService: OrderService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginService.userData.subscribe((userData) => {
      if (userData) {
        this.userId = userData.id;
        this.retrieveUserOrders();
      }
    });
  }

  retrieveUserOrders(): void {
    if (this.userId) {
      this.orderService.getAllOrdersByUser(this.userId).subscribe({
        next:(orders) => {
        this.orders = orders;
      },
      error: (error) => {
        console.error('Error al obtener las órdenes del usuario:', error);
    }
  });
}
  }

  showOrderDetails(orderId: number): void {
    this.orderService.getOrderDetails(orderId).subscribe({
      next: (details) => {
        this.selectedOrderDetails = details;
      },
      error: (error) => {
        console.error('Error al recuperar los detalles del pedido:', error);
      }
    });
  }
}



