import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartService } from '../../services/features/cart.service';
import { OrderService } from '../../services/features/order.service';
import { LoginService } from '../../services/auth/auth.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog-error/dialog.component';
import { DialogSuccessComponent } from '../dialog-success/dialog-success.component';
import { Router } from '@angular/router';
@Component({
  selector: 'cliente-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogComponent], 
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
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
  // router: any;

constructor(private formBuilder: FormBuilder,
  private cartService: CartService,
  private orderService: OrderService,
  private loginService: LoginService,
  public dialog: MatDialog,
  private router: Router,

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
     // Llamada al método para autorellenar el formulario con datos del localStorage
  this.autorellenarFormulario();
}

autorellenarFormulario(): void {
  // Obtener la información del cliente de localStorage
  const clienteInfo = JSON.parse(localStorage.getItem('user')!);

  // Si existe información del cliente, establecer los valores del formulario
  if (clienteInfo) {
    this.checkoutForm.patchValue({
      fullName: `${clienteInfo.nombre} ${clienteInfo.apellido}` || '',
      email: clienteInfo.email || '',
      address: clienteInfo.direccionEnvio || '',
      city: clienteInfo.localidad?.nombre || '',
      state: clienteInfo.localidad?.provincia?.nombre || '',
      zip: clienteInfo.localidad?.codigoPostal || '',
      // No autorellenar información sensible de la tarjeta
    });
  }

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
          this.showSuccesModal('Enviando...'); 
          // Redirigir al usuario o mostrar un mensaje de éxito
        },
        error: (error) => {
          // Manejar el error
          console.error('Error al realizar la compra', error);
          this.showErrorModal('Ha ocurrido un error al procesar tu pedido.');
          // Mostrar un mensaje de error al usuario
        }
      }); 
      // Resetea el formulario después de enviar los datos
      this.checkoutForm.reset();
      // Todo ok, limpia el carrito
      this.cartService.clearCart();
    } else {
      this.showErrorModal('Por favor, completa el formulario correctamente antes de proceder al pago.')
    }
  }


  showErrorModal(message: string): void {
    const dialogRef: MatDialogRef<DialogComponent> = this.dialog.open(DialogComponent, {
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se ha cerrado'); // despues de que se cierre el modal....
    });
  }


  showSuccesModal(message: string): void {
    const dialogRef: MatDialogRef<DialogSuccessComponent> = this.dialog.open(DialogSuccessComponent, {
      data: { message: message }
    });

    setTimeout(() => {
      dialogRef.close();
      this.checkoutForm.reset(); // Resetea el formulario
      this.cartService.clearCart(); // Limpia el carrito
      this.router.navigate(['/app-user/mis-pedidos']); // Redirige a la página de confirmación
    }, 5000);

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se ha cerrado');
      // Aquí puedes poner cualquier lógica adicional que necesites después de cerrar el modal
    });
  }

  @Output() cancelarCompraEvent = new EventEmitter();

  cancelarCompra(): void {
    this.cancelarCompraEvent.emit(); // Emitir el evento al hacer clic en "Cancelar compra"
  }






}