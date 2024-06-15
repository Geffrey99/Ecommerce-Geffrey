import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/auth/users.service';
import { OrderService } from '../../services/features/order.service';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';


@Component({
  selector: 'crud-clientes',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatListModule, MatPaginator],
  templateUrl: './crud-clientes.component.html',
  styleUrl: './crud-clientes.component.css'
})
export class CrudClientesComponent implements OnInit {
  usuarios: any[] = [];
  displayedColumns: string[] = ['foto', 'nombre', 'apellido', 'Informacion'];
  dataSource = new MatTableDataSource<any>([]); //  MatTableDataSource para los usuarios
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ordenesSeleccionadas: any[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private orderService: OrderService,
    private router: Router,
  
  ) {}

  ngOnInit(): void {
    this.usuarioService.obtenerTodosLosUsuarios().subscribe({
      next: (data) => {
        this.dataSource.data = data; 
      },
      error: (e) => console.error(e)
    });
  }




verOrdenesDeUsuario(userId: number): void {
  this.router.navigate(['admin/datos-cliente', userId]);
}


  // verOrdenesDeUsuario(userId: number): void {
  //   this.orderService.getAllOrdersByUser(userId).subscribe({
  //     next: (ordenes) => {
  //       this.ordenesSeleccionadas = ordenes;
  //     },
  //     error: (e) => console.error(e)
  //   });
  // }

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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Asigno el paginator al dataSource después de que se inicialice la vistaaa
  }


}