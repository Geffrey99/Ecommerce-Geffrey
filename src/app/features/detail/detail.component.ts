import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/features/product.service';
import { Product } from '../../services/features/Product';
import { PhotoProductService } from '../../services/PhotoProduct.service';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { HeaderComponent } from "../../shared/header/header.component";
@Component({
    selector: 'app-detail',
    standalone: true,
    providers: [ProductService, PhotoProductService],
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.css',
    imports: [HttpClientModule, CommonModule, HeaderComponent]
})

export class DetailComponent implements OnInit {
  productId!: number;
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private PhotoProductService: PhotoProductService
  ) { }

  ngOnInit(): void {
    // Obtener el ID del producto de los parámetros de la URL
    const id = this.route.snapshot.paramMap.get('id');
    this.productId = id ? +id : 0;
    
    // Cargar el producto correspondiente al ID
    this.loadProduct();
  }

  loadProduct(): void {
    this.productService.getProductById(this.productId)
      .subscribe(product => {
        this.product = product;
      });
  }

  selectedFile: File | undefined;
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }

  onSubmit() {
    if (this.productId) { // Obtén el ID del producto según tu lógica
      if (this.selectedFile) {
        this.PhotoProductService.addProductImage(this.productId, this.selectedFile).subscribe(
          response => {
            console.log('Imagen cargada exitosamente');
            // Realiza acciones adicionales si es necesario
          },
          error => {
            console.error('Error al cargar la imagen:', error);
            debugger; // Esta línea detendrá la ejecución y activará el depurador del navegador
            // Maneja el error de carga de la imagen
          }
        );
        debugger;
      } else {
        console.error('No se seleccionó ninguna imagen');
        // Maneja la situación en la que no se selecciona ninguna imagen
      }
    }
  }
}