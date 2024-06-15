import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/features/order.service';

@Component({
  selector: 'gestionar-pedidos',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule],
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
  estadoActivo: string = 'Todos'; // Estado inicial que muestra todos los pedidossss
  ordersFiltrados = [...this.orders];

  fechaInicio!: string;

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

  cambiarEstadoActivo(nuevoEstado: string): void {
    this.estadoActivo = nuevoEstado;
    this.aplicarFiltros();
  }

  filtrarPorFecha(): void {
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    // Primero filtra por estado
    let pedidosFiltradosPorEstado = this.orders.filter(order => 
      this.estadoActivo === 'Todos' || order.estado === this.estadoActivo
    );

    // Luego, si hay una fecha seleccionada, filtra esos resultados por fecha
    if (this.fechaInicio) {
      const fechaSeleccionada = new Date(this.fechaInicio);
      fechaSeleccionada.setHours(0, 0, 0, 0);

      this.ordersFiltrados = pedidosFiltradosPorEstado.filter(order => {
        const fechaCompra = new Date(order.fechaCompra);
        fechaCompra.setHours(0, 0, 0, 0);
        return fechaCompra.getTime() === fechaSeleccionada.getTime();
      });
    } else {
      // Si no hay fecha seleccionada, muestra todos los pedidos filtrados por estado
      this.ordersFiltrados = pedidosFiltradosPorEstado;
    }
  }


  // cambiarEstadoActivo(estado: string) {
  //   this.estadoActivo = estado;
  //   this.filtrarPorFecha(); 
  // }

}
