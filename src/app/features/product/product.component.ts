import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/features/product.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Product } from '../../services/producto';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  private imageBaseUrl = 'http://localhost:8081/api/product-images/';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data.map(product => {
        product.photoUrl = product.photoUrl;  // Este campo ya debería contener el nombre de archivo
        return product;
      });
    });
  }

  getFullImageUrl(photoUrl: string): string {
    return `${this.imageBaseUrl}${photoUrl}`;
  }
}

