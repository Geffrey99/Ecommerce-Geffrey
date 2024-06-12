import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/features/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-productos',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule ],
  templateUrl: './editar-productos.component.html',
  styleUrl: './editar-productos.component.css'
})
export class EditarProductosComponent implements OnInit{

editForm!: FormGroup;
productId!:number;
categories = [
  { id: 1, name: 'Móviles' },
  { id: 2, name: 'Portátiles' },
  { id: 3, name: 'Accesorios' }
  // ... puedes agregar más categorías aquí
];

private imageBaseUrl = 'http://localhost:8081/api/product-images/';

selectedFile: File | null = null;

constructor(
private productService: ProductService,
private route: ActivatedRoute,
private router: Router,
private fb: FormBuilder,
) {} // Added closing parenthesis for the constructor

ngOnInit(): void {
  this.productId = this.route.snapshot.params['id'];
  this.editForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', [Validators.required, Validators.min(1.01)]], 
    stock: ['', [Validators.required, Validators.min(1)]],
    photoPath: [''],
    category: this.fb.group({
      id: ['', Validators.required] // Asegúrate de que 'id' sea un campo dentro de un FormGroup para 'category'
    }),
  });
  
  this.productService.getProductById(this.productId).subscribe(product => {
    this.editForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      photoPath: product.photoPath,
      category: {
        id: product?.category?.id // Asegúrate de que esto coincida con la estructura del FormGroup
      }
    });
  });
}

onSubmit(): void {
  if (this.editForm.valid) {
    const formData = new FormData();
    formData.append('name', this.editForm.value.name);
    formData.append('description', this.editForm.value.description);
    formData.append('price', this.editForm.value.price.toString()); // Convertir a string si es necesario
    formData.append('stock', this.editForm.value.stock.toString()); // Convertir a string si es necesario
    formData.append('categoryId', this.editForm.value.category.id); // Enviar solo el ID de la categoría

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    this.productService.updateProduct(this.productId, formData).subscribe(() => {
      this.router.navigate(['/products']);
    }, error => {
      console.error('Error al actualizar el producto:', error);
    });
  }
}
    

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    // Simplemente guarda el archivo en la propiedad selectedFile
    this.selectedFile = file;
  }
}



getFullImageUrl(photoUrl: string): string {
  return photoUrl ? `${this.imageBaseUrl}${photoUrl}` : 'assets/okOk.svg';
}

}