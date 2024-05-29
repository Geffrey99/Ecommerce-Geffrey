import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'crud-productos',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './crud-productos.component.html',
  styleUrl: './crud-productos.component.css'
})
export class CrudProductosComponent {

  productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
     private http: HttpClient) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      stock: ['', Validators.required],
      category: [], // Agregar el campo de la categoría aquí
      photo: ['']
    });
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({
        photo: file
      });
    }
  }
  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      const name = this.productForm.get('name')?.value;
      const price = this.productForm.get('price')?.value;
      const description = this.productForm.get('description')?.value;
      const stock = this.productForm.get('stock')?.value;
      const category = this.productForm.get('category')?.value; // Agregar el campo de la categoría aquí
      const photo = this.productForm.get('photo')?.value;

      if (name) {
        formData.append('name', name);
      }
      if (price) {
        formData.append('price', price);
      }
      if (description) {
        formData.append('description', description);
      }
      if (stock) {
        formData.append('stock', stock);
      }
      if (category) {
        formData.append('category', category); // Enviar el nombre de la categoría directamente
      }
      if (photo) {
        formData.append('photo', photo);
      }

      this.http.post<any>('http://localhost:8081/api/products/create', formData).subscribe(
        response => {
          console.log('Producto creado exitosamente:', response);
          // Aquí puedes manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
        },
        error => {
          console.error('Error al crear el producto:', error);
          // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        }
      );
    } else {
      // Marcar los campos del formulario como inválidos o mostrar un mensaje al usuario
    }
  }


}
