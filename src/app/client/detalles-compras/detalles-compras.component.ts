import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { OrderService } from '../../services/features/order.service';
import { LoginService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-detalles-compras',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './detalles-compras.component.html',
  styleUrl: './detalles-compras.component.css'
})
export class DetallesComprasComponent {
  userId: number | undefined;
  orders: any[] = [];
  selectedOrderDetails: any | undefined;
  orderDetails: any | undefined;
  p: number = 1;
  estadoActivo: string = 'Todos'; // Estado inicial que muestra todos los pedidos
  ordersFiltrados = [...this.orders];

  selectedStatus: { [key: number]: string } = {}; 

  constructor(
    private orderService: OrderService,
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
        this.cambiarEstadoActivo(this.estadoActivo);
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

  closeOrderDetails(): void {
    this.selectedOrderDetails = null;
  }


  changeOrderStatus(orderId: number, newStatus: string): void {
    this.orderService.updateOrderStatus(orderId, newStatus).subscribe({
      next: (response) => {

      const order = this.orders.find(o => o.id === orderId);
      if (order) {
        order.estado = newStatus;
      }

        console.log('Estado de la orden actualizado', response);

      },
      error: (error) => {
        console.error('Error al actualizar el estado de la orden', error);
      }
    });
  }


// Método para cambiar el estado activo y filtrar la lista de pedidos
cambiarEstadoActivo(nuevoEstado: string): void {
  this.estadoActivo = nuevoEstado;
  if (this.orders) {
    this.ordersFiltrados = this.orders.filter(order => nuevoEstado === 'Todos' || order.estado === nuevoEstado);
  }
}
}



