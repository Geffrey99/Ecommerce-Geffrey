import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { OrderService } from '../../services/features/order.service';

@Component({
  selector: 'gestionar-pedidos',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './gestionar-pedidos.component.html',
  styleUrl: './gestionar-pedidos.component.css'
})
export class GestionarPedidosComponent {
  orders: any[] = [];
  selectedStatus: { [key: number]: string } = {}; 
  selectedOrderDetails: any | undefined;
  filteredOrders: any[] = [];
  // currentFilter: string = 'PENDIENTE'; 
  p:number = 1;
  estadoActivo: string = 'Todos'; // Estado inicial que muestra todos los pedidos
  ordersFiltrados = [...this.orders];




  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.retrieveAllOrders();
  }

  retrieveAllOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.cambiarEstadoActivo(this.estadoActivo);
      },
      error: (error) => {
        console.error('Error al recuperar todos los pedidos:', error);
      }
    });
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
            // Encuentra la orden en la lista y actualiza su estado
      const order = this.orders.find(o => o.id === orderId);
      if (order) {
        order.estado = newStatus;
      }
        // Actualiza la interfaz de usuario o la lista de órdenes si es necesario
        console.log('Estado de la orden actualizado', response);
        // Aquí podrías recargar los detalles de la orden o actualizar la vista
      },
      error: (error) => {
        console.error('Error al actualizar el estado de la orden', error);
      }
    });
  }

  cambiarEstadoActivo(nuevoEstado: string): void {
    this.estadoActivo = nuevoEstado;
    if (this.orders) {
      this.ordersFiltrados = this.orders.filter(order => nuevoEstado === 'Todos' || order.estado === nuevoEstado);
    }

  }

}
