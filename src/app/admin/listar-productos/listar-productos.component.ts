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

  editarProducto(productId: number): void {
    this.router.navigate(['admin/editar-producto', productId]);
  }

  eliminarProducto(productId: number): void {
    // Lógica para eliminar el producto
  }

  getFullImageUrl(photoUrl: string): string {
    return photoUrl ? `${this.imageBaseUrl}${photoUrl}` : 'assets/okOk.svg';
  }
}