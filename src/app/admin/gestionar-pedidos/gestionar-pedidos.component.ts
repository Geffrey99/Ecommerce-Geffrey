import { Component } from '@angular/core';
import { OrderService } from '../../services/features/order.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'gestionar-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestionar-pedidos.component.html',
  styleUrl: './gestionar-pedidos.component.css'
})
export class GestionarPedidosComponent {
  orders: any[] = [];
  selectedStatus: { [key: number]: string } = {}; 

  filteredOrders: any[] = [];
  currentFilter: string = 'PENDIENTE'; 

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.retrieveAllOrders();
  }

  retrieveAllOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.filterOrders(this.currentFilter);
      },
      error: (error) => {
        console.error('Error al recuperar todos los pedidos:', error);
      }
    });
  }

  filterOrders(status: string) {
    this.currentFilter = status;
    this.filteredOrders = this.orders.filter(order => order.estado === status);
  }



  changeOrderStatus(orderId: number) {
    const newStatus = this.selectedStatus[orderId];
    if (newStatus) {
      this.orderService.updateOrderStatus(orderId, newStatus).subscribe({
        next: () => {
          // Eliminar el pedido de la lista
          this.orders = this.orders.filter(order => order.id !== orderId);
        },
        error: (error) => {
          console.error('Error al cambiar el estado del pedido:', error);
        }
      });
    }
  }

  updateSelectedStatus(orderId: number, status: string) {
    this.selectedStatus[orderId] = status;
  }
}

