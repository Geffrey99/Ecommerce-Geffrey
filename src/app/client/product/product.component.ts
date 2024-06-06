import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/features/product.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Product } from '../../interface/producto';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryService } from '../../services/features/category.service';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, NgxPaginationModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  p: number = 1; // Inicializa la variable p con la página 1 como valor predeterminado
  currentSort: string = 'invalid'; // 'asc' para más barato a más caro, 'desc' para viceversa

  filterTerm: string = '';
  filteredProducts: Product[] = []; // Añade esta línea para declarar la propiedad
  // currentSortO: string = 'invalid'; // Valor predeterminado que indica una opción no válida
  searchQuery: string = ''; // Propiedad para almacenar la consulta de búsqueda
  private imageBaseUrl = 'http://localhost:8081/api/product-images/';
  constructor(
    private productService: ProductService, 
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = [...this.products]; // Clona la lista de productos
      this.applyFilters(); // Aplica los filtros iniciales
    });
  }

  applyFilters() {
    // Comienza con todos los productos y luego aplica los filtros en secuencia
    let result = [...this.products];

    // Filtra por nombre si hay un término de búsqueda
    if (this.searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Ordena por precio si se ha seleccionado una opción válida
    if (this.currentSort !== 'invalid') {
      result.sort((a, b) => {
        return this.currentSort === 'asc' ? a.price - b.price : b.price - a.price;
      });
    }

    // Actualiza los productos filtrados con el resultado
    this.filteredProducts = result;
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;
    this.applyFilters(); // Aplica ambos filtros
  }

  onSortChanged(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.currentSort = selectElement.value;
    this.applyFilters(); // Aplica ambos filtros
  }
  getFullImageUrl(photoUrl: string): string {
    return photoUrl ? `${this.imageBaseUrl}${photoUrl}` : 'assets/okOk.svg';
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

}

  // getFullImageUrl(photoUrl: string): string {
  //   return `${this.imageBaseUrl}${photoUrl}`;
  // }


  
