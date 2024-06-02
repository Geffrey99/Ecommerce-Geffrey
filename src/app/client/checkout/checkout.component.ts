import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../../services/features/cart.service';
import { OrderService } from '../../services/features/order.service';
import { LoginService } from '../../services/auth/auth.service';
import { usuario } from '../../interface/user';
@Component({
  selector: 'cliente-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  userId: number | undefined;

constructor(private formBuilder: FormBuilder,
  private cartService: CartService,
  private orderService: OrderService,
  private loginService: LoginService)  {}

  ngOnInit(): void {
    // Suscríbete al observable userData para obtener los datos del usuario
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

checkoutForm = this.formBuilder.group({
  name:'',
  address:''
});



onSubmit(): void {
  if (this.userId === undefined) {
    console.error('El ID del usuario no está definido');
    return;
  }
  const orderDetails = this.cartService.getOrderDetails();
  const userInfo = this.checkoutForm.value;
  
  // Aquí puedes combinar la información del usuario con los detalles del pedido
  // y enviar todo al backend
  this.orderService.createOrder(this.userId, orderDetails).subscribe({
    next: (order) => {
      // Manejar la respuesta exitosa
      console.warn('Te llegará a tu correo el ticket: ', order);
      // Aquí podrías redirigir al usuario o mostrar un mensaje de éxito
    },
    error: (error) => {
      // Manejar el error
      console.error('Error al realizar la compra', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  });

  this.checkoutForm.reset();
  // this.cartService.clearCart();
}
}

