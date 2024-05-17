import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
  product?: Product;
  products: Product[] = [];
  private imageBaseUrl = 'http://localhost:8081/api/product-images/';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private PhotoProductService: PhotoProductService,
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
    // Obtener el ID del producto de los parámetros de la URL
    const id = this.route.snapshot.paramMap.get('id');
    this.productId = id ? +id : 0;

      // Desplazarse hacia arriba
      this.viewportScroller.scrollToPosition([0, 0]);

    
    // Cargar el producto correspondiente al ID
    this.loadProduct();

    this.productService.getAllProducts().subscribe(data => {
      this.products = data.map(product => {
        product.photoUrl = product.photoUrl;  // Este campo ya debería contener el nombre de archivo
        return product;
      });
    });
  }

  loadProduct(): void {
    this.productService.getProductById(this.productId)
      .subscribe(product => {
        this.product = product;
        console.log(this.product);
      });
  }

  getFullImageUrl(photoUrl: string): string {
    return `${this.imageBaseUrl}${photoUrl}`;
  }

// para cargar imagen de product 

  // selectedFile: File | undefined;
  // onFileSelected(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files && inputElement.files.length > 0) {
  //     this.selectedFile = inputElement.files[0];
  //   }
  // }

  // onSubmit() {
  //   if (this.productId) { // Obtén el ID del producto según tu lógica
  //     if (this.selectedFile) {
  //       this.PhotoProductService.addProductImage(this.productId, this.selectedFile).subscribe(
  //         response => {
  //           console.log('Imagen cargada exitosamente');
  //           // Realiza acciones adicionales si es necesario
  //         },
  //         error => {
  //           console.error('Error al cargar la imagen:', error);
  //           debugger; // Esta línea detendrá la ejecución y activará el depurador del navegador
  //           // Maneja el error de carga de la imagen
  //         }
  //       );
  //       debugger;
  //     } else {
  //       console.error('No se seleccionó ninguna imagen');
  //       // Maneja la situación en la que no se selecciona ninguna imagen
  //     }
  //   }
  // }


  loadSelectedProduct(productId: number): void {
    this.productService.getProductById(productId)
      .subscribe(product => {
        this.product = product;
        this.productId = productId;
        this.viewportScroller.scrollToPosition([0, 0]);
        console.log('Producto seleccionado:', this.product);
        // Actualiza la URL con el ID del producto seleccionado
        this.router.navigate(['../', productId], { relativeTo: this.route });
      });
  }
}