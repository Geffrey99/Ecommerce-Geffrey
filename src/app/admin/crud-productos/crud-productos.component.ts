import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacionComponent} from '../modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'crud-productos',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, CommonModule, ModalConfirmacionComponent],
  templateUrl: './crud-productos.component.html',
  styleUrl: './crud-productos.component.css'
})
export class CrudProductosComponent {

  productForm: FormGroup;
  selectedFile: File | null = null;
  imagenPrevisualizacion?: string | ArrayBuffer | null;

  constructor(
      private dialog: MatDialog,
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
      // Simplemente guarda el archivo en la propiedad selectedFile
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = e => {
        // Asegúrate de que el resultado no sea 'null' antes de asignarlo
        if (reader.result) {
          this.imagenPrevisualizacion = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }
  




  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.productForm.patchValue({
  //       photo: file
  //     });
  //   }
  // }
  onSubmit() {
    if (this.productForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('stock', this.productForm.get('stock')?.value);
      formData.append('category', this.productForm.get('category')?.value);
      formData.append('photo', this.selectedFile); // Añade el archivo seleccionado directamente

      this.http.post<any>('http://localhost:8081/api/products/create', formData).subscribe(
        response => {
          this.openConfirmModal('Confirmación de Creación', 'El producto ha sido creado exitosamente.', 'Ok');
          this.productForm.reset();
          this.selectedFile = null;
          this.imagenPrevisualizacion = null;
        
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

  openConfirmModal(title: string, message: string, buttonText: string): void {
    this.dialog.open(ModalConfirmacionComponent, {
      data: {
        title: title,
        message: message,
        buttonText: buttonText
      }
    });
  }

}
