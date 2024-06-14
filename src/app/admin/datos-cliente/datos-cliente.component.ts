import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/auth/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/features/order.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-datos-cliente',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatListModule, MatPaginator],
  templateUrl: './datos-cliente.component.html',
  styleUrl: './datos-cliente.component.css'
})
export class DatosClienteComponent implements OnInit{

  userId!: number;
  usuario!: any;

  ordenesSeleccionadas: any[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
  
  ){}


  ngOnInit(): void {
   this.userId = this.route.snapshot.params['id'];
   this.cargarUsuario(this.userId);
  }
  cargarUsuario(id: number): void {
    this.usuarioService.obtenerUsuarioPorId(id).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
      },
      error: (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    });
  }

  verComprasDeUsuario(userId: number): void {
    this.orderService.getAllOrdersByUser(userId).subscribe({
      next: (ordenes) => {
        this.ordenesSeleccionadas = ordenes;
      },
      error: (e) => console.error(e)
    });
  }

  selectedOrderDetails: any | undefined;
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