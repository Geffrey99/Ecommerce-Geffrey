import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/features/product.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Product } from '../../interface/producto';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  // cargando: boolean = true;
  // // Referencia al ng-template del modal de espera
  // @ViewChild('modalEspera') modalEsperaRef: TemplateRef<any> | undefined;

  private imageBaseUrl = 'http://localhost:8081/api/product-images/';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data.map(product => {
        product.photoUrl = product.photoUrl; 
        // this.cargando = false; 
        return product;
      });
    });
  }

  getFullImageUrl(photoUrl: string): string {
    return `${this.imageBaseUrl}${photoUrl}`;
  }
}

