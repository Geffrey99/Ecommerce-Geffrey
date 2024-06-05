import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartService } from '../../services/features/cart.service';
import { OrderService } from '../../services/features/order.service';
import { LoginService } from '../../services/auth/auth.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'cliente-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogComponent], 
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  userId: number | undefined;

  checkoutForm = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    // zip: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]], // Código postal de EE.UU. como ejemplo
    zip: ['', [Validators.required, Validators.minLength(4)]], // Código postal de EE.UU. como ejemplo
    cardName: ['', [Validators.required]],
    // cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]], // Número de tarjeta de crédito simple
    cardNumber: ['', [Validators.required, Validators.minLength(5)]], // Número de tarjeta de crédito simple
    expMonth: ['', [Validators.required]],
    expYear: ['', [Validators.required, Validators.min(new Date().getFullYear())]],
    cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]] // CVV de 3 o 4 dígitos
  });

constructor(private formBuilder: FormBuilder,
  private cartService: CartService,
  private orderService: OrderService,
  private loginService: LoginService,
  public dialog: MatDialog

)  {}

  ngOnInit(): void {
    this.loginService.userData.subscribe({
      next: (userData) => {
        if (userData) {
          this.userId = userData.id;
          // Asumiendo que tu interfaz Usuario tiene una propiedad id
          // Aquí puedes acceder a otros datos del usuario si es necesario
        } else {
          console.log('User data is null');
        }
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.checkoutForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio.';
    } else if (control?.hasError('minlength')) {
      return 'El valor es demasiado corto.';
    } else if (control?.hasError('email')) {
      return 'Correo electrónico no válido.';
    } else if (control?.hasError('pattern')) {
      return 'Formato no válido.';
    } else if (control?.hasError('min')) {
      return 'El valor es demasiado bajo.';
    }
    return '';
  }

  onSubmit(): void {
    // Verifica si el formulario es válido
    if (this.checkoutForm.valid) {
      if (this.userId === undefined) {
        console.error('El ID del usuario no está definido');
        return;
      }
      const orderDetails = this.cartService.getOrderDetails();
      const userInfo = this.checkoutForm.value;
      
      // Combina la información del usuario con los detalles del pedido y envía todo al backend
      this.orderService.createOrder(this.userId, orderDetails).subscribe({
        next: (order) => {
          // Manejar la respuesta exitosa
          console.warn('Te llegará a tu correo el ticket: ', order);
          // Redirigir al usuario o mostrar un mensaje de éxito
        },
        error: (error) => {
          // Manejar el error
          console.error('Error al realizar la compra', error);
          // Mostrar un mensaje de error al usuario
        }
      });
  
      // Resetea el formulario después de enviar los datos
      this.checkoutForm.reset();
      // Limpia el carrito de compras si es necesario
      // this.cartService.clearCart();
    } else {
      // Si el formulario no es válido, puedes manejar este caso como prefieras
      // Por ejemplo, mostrar un mensaje al usuario indicando que debe completar el formulario correctamente
      console.error('Por favor, completa el formulario correctamente antes de enviar.');
      this.showErrorModal('Por favor, completa el formulario correctamente antes de enviar.')
    }
  }


  showErrorModal(message: string): void {
    const dialogRef: MatDialogRef<DialogComponent> = this.dialog.open(DialogComponent, {
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se ha cerrado');
      // Aquí puedes manejar lo que sucede después de que el modal se cierra
    });
  }
}

