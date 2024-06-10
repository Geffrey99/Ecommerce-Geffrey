import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CartService } from '../../services/features/cart.service';
import { CheckoutComponent } from '../checkout/checkout.component';
import { Product } from '../../interface/Product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, ReactiveFormsModule, CheckoutComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  mostrarCheckout: boolean = false;
  
  constructor(private cartService: CartService,
             ) {}
 


  ngOnInit(): void {
      this.cartService.cart$.subscribe((cart: Product[]) => {
          this.cart = cart;
      });
  }

  getTotal(): number {
      return this.cart.reduce((acc, product) => acc + product.price, 0);
  }

  removeProduct( productoEliminar: Product ): void {
    const newCart = this.cart.filter(product => product.id !== productoEliminar.id);
    this.cartService.updateCart(newCart);
  }

  existenProductos(): boolean {
    return this.cart.length > 0;
  }
  
  cancelarCompra(): void {
    this.mostrarCheckout = false;
  }
  manejarCancelarCompra(): void {
    this.mostrarCheckout = false; 
  }
}