import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { Product } from '../../interface/Product';
import { ProductService } from '../../services/features/product.service';


@Component({
  selector: 'lista-productos',
  standalone: true,
  imports: [CommonModule,MatPaginator, MatListModule, MatTableModule],
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.css'
})
export class ListarProductosComponent implements OnInit {
  displayedColumns: string[] = ['foto', 'nombre', 'categoria', 'stock', 'precio', 'acciones'];
  dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private imageBaseUrl = 'http://localhost:8081/api/product-images/';

  constructor(private productService: ProductService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.dataSource.data = products;
      },
      error: (e) => console.error(e)
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }




  eliminarProducto(productId: number): void {
    if(confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.productService.deleteProduct(productId).subscribe({
        next: (response) => {
          console.log('Producto eliminado con éxito', response);
          alert('Producto eliminado con éxito');   
      },
      error: (error) => {
        console.error('Error al eliminar el producto', error);
        // Verifica si la respuesta contiene un mensaje de error específico y lo muestra 
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente o de la red
          alert('Error al eliminar el producto: ' + error.error.message);
        } else if (error.error && error.error.message) {
          // En este caso el backend devolvió un código de respuesta de error
          alert(error.error.message);
        } else {
          // Si no hay un mensaje de error específico, muestro un mensaje genérico
          alert('Error al eliminar el producto, tiene stock o está en un pedido pendiente');
        }
      }
    });
  }
}

  editarProducto(productId: number): void {
    this.router.navigate(['admin/editar-producto', productId]);
  }

  getFullImageUrl(photoUrl: string): string {
    return photoUrl ? `${this.imageBaseUrl}${photoUrl}` : 'assets/okOk.svg';
  }
}